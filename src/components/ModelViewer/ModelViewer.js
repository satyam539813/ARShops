import React, { useRef, useState, useEffect, useCallback } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const ModelViewer = ({ item, addToWishlist, removeFromWishlist, wishlist }) => {
  const [ARSupported, setARSupported] = useState(false);
  const [annotate, setAnnotate] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  
  const modelViewer = useRef();

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setARSupported(isMobile);
  }, []);

  useEffect(() => {
    if (wishlist && item) {
      const isInWishlist = wishlist.some((wishlistItem) => wishlistItem.id === item.id);
      setIsInWishlist(isInWishlist);
    }
  }, [item, wishlist]);

  useEffect(() => {
    const modelViewerElement = modelViewer.current;
    if (!modelViewerElement) return;

    const handleLoad = () => {
      setIsLoading(false);
      setError(null);
    };

    const handleError = (event) => {
      setIsLoading(false);
      setError('Failed to load 3D model');
      console.error('Model loading error:', event);
    };

    modelViewerElement.addEventListener('load', handleLoad);
    modelViewerElement.addEventListener('error', handleError);

    return () => {
      modelViewerElement.removeEventListener('load', handleLoad);
      modelViewerElement.removeEventListener('error', handleError);
    };
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      modelViewer.current?.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }, []);

  const handleWishlistToggle = useCallback(() => {
    if (isInWishlist) {
      removeFromWishlist?.(item.id);
    } else {
      addToWishlist?.(item);
    }
  }, [isInWishlist, item, addToWishlist, removeFromWishlist]);

  if (!item) {
    return (
      <div className="w-full h-96 bg-slate-800/50 rounded-xl flex items-center justify-center">
        <span className="text-slate-400">No item data available</span>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Model Viewer Container */}
      <div className="relative w-full h-96 bg-gradient-to-br from-slate-800/50 to-purple-900/20 rounded-xl overflow-hidden">
        <model-viewer
          ref={modelViewer}
          src={item.modelSrc}
          ios-src={item.iOSSrc}
          alt={`3D model of ${item.name}`}
          ar
          ar-modes="webxr scene-viewer quick-look"
          camera-controls
          auto-rotate
          auto-rotate-delay="3000"
          rotation-per-second="30deg"
          interaction-prompt="auto"
          loading="eager"
          reveal="auto"
          className="w-full h-full"
          style={{
            backgroundColor: 'transparent',
            '--poster-color': 'transparent'
          }}
        >
          {/* Loading State */}
          {isLoading && (
            <div slot="poster" className="absolute inset-0 flex items-center justify-center bg-slate-800/50 backdrop-blur-sm">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
                <div className="text-white font-medium">Loading 3D Model...</div>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div slot="poster" className="absolute inset-0 flex items-center justify-center bg-slate-800/50 backdrop-blur-sm">
              <div className="text-center space-y-4">
                <div className="text-4xl">⚠️</div>
                <div className="text-red-300">{error}</div>
              </div>
            </div>
          )}

          {/* AR Button */}
          {ARSupported && (
            <button 
              slot="ar-button" 
              className="absolute bottom-4 left-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
            >
              View in AR
            </button>
          )}

          {/* Annotations */}
          {annotate && item.annotations?.map((annotation, idx) => (
            <button
              key={idx}
              className="absolute w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold hover:bg-purple-600 transition-colors duration-200 shadow-lg"
              slot={annotation.slot}
              data-position={annotation.position}
              data-normal={annotation.normal}
              data-orbit={annotation.orbit}
              data-target={annotation.target}
              data-visibility-attribute="visible"
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {annotation.title}
              </div>
              i
            </button>
          ))}
        </model-viewer>

        {/* Control Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button 
            onClick={() => setShowHelp(!showHelp)}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
            title="Help"
          >
            ?
          </button>
          
          <button 
            onClick={() => setAnnotate(!annotate)}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
            title="Toggle annotations"
          >
            i
          </button>

          <button 
            onClick={toggleFullscreen}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
            title="Fullscreen"
          >
            ⛶
          </button>
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={handleWishlistToggle}
          className={`absolute top-4 left-4 w-10 h-10 rounded-lg transition-all duration-300 flex items-center justify-center text-xl ${
            isInWishlist 
              ? 'bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30' 
              : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20'
          }`}
          title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isInWishlist ? '❤️' : '🤍'}
        </button>

        {/* Help Overlay */}
        {showHelp && (
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-6 rounded-xl">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 max-w-md">
              <h3 className="text-white font-bold text-lg mb-4">3D Navigation Help</h3>
              <div className="space-y-3 text-sm text-slate-300">
                <div><strong className="text-white">Rotate:</strong> Click and drag</div>
                <div><strong className="text-white">Zoom:</strong> Scroll or pinch</div>
                <div><strong className="text-white">Pan:</strong> Right-click and drag</div>
                <div><strong className="text-white">Reset:</strong> Double-click background</div>
              </div>
              <button 
                onClick={() => setShowHelp(false)}
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
              >
                Got it
              </button>
            </div>
          </div>
        )}

        {/* QR Code for non-AR devices */}
        {!ARSupported && (
          <div className="absolute bottom-4 right-4">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3">
              <LazyLoadImage
                src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(window.location.href)}`}
                alt="QR Code for AR view"
                effect="blur"
                height={80}
                width={80}
                className="rounded"
              />
              <p className="text-xs text-slate-300 mt-2 text-center">Scan for AR</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ModelViewer);