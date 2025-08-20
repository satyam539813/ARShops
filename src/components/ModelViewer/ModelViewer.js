import React, { useRef, useState, useEffect, useCallback } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import Help from "./Help";

const ModelViewer = ({ item, addToWishlist, removeFromWishlist, wishlist }) => {
  const [display, setDisplay] = useState(false);
  const [ARSupported, setARSupported] = useState(false);
  const [annotate, setAnnotate] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const modelViewer = useRef();
  const variantRef = useRef(null);

  // Optimized model viewer styles
  const modelViewerStyles = {
    backgroundColor: "#f8fafc",
    overflowX: "hidden",
    posterColor: "#e2e8f0",
    width: "100%",
    height: ARSupported ? "85%" : "75%",
    borderRadius: 15,
    transition: "all 0.3s ease",
  };

  // Check AR support
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setARSupported(isMobile);
  }, []);

  // Handle wishlist state
  useEffect(() => {
    if (wishlist && item) {
      const isInWishlist = wishlist.some((wishlistItem) => wishlistItem.id === item.id);
      setIsInWishlist(isInWishlist);
    }
  }, [item, wishlist]);

  // Model viewer event handlers
  useEffect(() => {
    const modelViewerElement = modelViewer.current;
    if (!modelViewerElement) return;

    const handleLoad = () => {
      setIsLoading(false);
      setError(null);
      
      // Handle variants
      const availableVariants = modelViewerElement.availableVariants;
      if (availableVariants && variantRef.current) {
        // Clear existing options
        variantRef.current.innerHTML = '';
        
        // Add variants
        availableVariants.forEach(variant => {
          const option = document.createElement('option');
          option.value = variant;
          option.textContent = variant;
          variantRef.current.appendChild(option);
        });

        // Add default option
        const defaultOption = document.createElement('option');
        defaultOption.value = 'Default';
        defaultOption.textContent = 'Default';
        variantRef.current.appendChild(defaultOption);
      }
    };

    const handleError = (event) => {
      setIsLoading(false);
      setError('Failed to load 3D model');
      console.error('Model loading error:', event);
    };

    const handleProgress = (event) => {
      // Handle loading progress if needed
    };

    modelViewerElement.addEventListener('load', handleLoad);
    modelViewerElement.addEventListener('error', handleError);
    modelViewerElement.addEventListener('progress', handleProgress);

    return () => {
      modelViewerElement.removeEventListener('load', handleLoad);
      modelViewerElement.removeEventListener('error', handleError);
      modelViewerElement.removeEventListener('progress', handleProgress);
    };
  }, []);

  // Variant change handler
  useEffect(() => {
    const variantElement = variantRef.current;
    if (!variantElement) return;

    const handleVariantChange = (event) => {
      const modelViewerElement = modelViewer.current;
      if (modelViewerElement) {
        modelViewerElement.variantName = event.target.value === 'Default' ? null : event.target.value;
      }
    };

    variantElement.addEventListener('change', handleVariantChange);
    return () => {
      variantElement.removeEventListener('change', handleVariantChange);
    };
  }, []);

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      modelViewer.current?.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }, []);

  // Annotation click handler
  const handleAnnotateClick = useCallback((annotation) => {
    const { target, position } = annotation;
    const modelViewerElement = modelViewer.current;
    if (modelViewerElement) {
      modelViewerElement.cameraTarget = position;
      modelViewerElement.orbit = target;
    }
  }, []);

  // Wishlist handler
  const handleAddToWishlist = useCallback(() => {
    if (isInWishlist) {
      removeFromWishlist?.(item.id);
    } else {
      addToWishlist?.(item);
    }
  }, [isInWishlist, item, addToWishlist, removeFromWishlist]);

  if (!item) {
    return <div className="model-view-error">No item data available</div>;
  }

  return (
    <div className="model-view">
      <model-viewer
        key={item.id}
        ref={modelViewer}
        style={modelViewerStyles}
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
      >
        {/* Loading indicator */}
        {isLoading && (
          <div slot="poster" className="model-loading">
            <div className="loading-spinner-small"></div>
            <div>Loading 3D Model...</div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div slot="poster" className="model-error">
            <div>⚠️</div>
            <div>{error}</div>
          </div>
        )}

        {/* AR Button */}
        {ARSupported && (
          <button slot="ar-button" className="arbutton">
            View in your space
          </button>
        )}

        {/* Control buttons */}
        <button 
          className="fullscreen-btn" 
          onClick={toggleFullscreen}
          aria-label="Toggle fullscreen"
        >
          &#x26F6;<span>full screen</span>
        </button>

        <button 
          className="help-btn" 
          onClick={() => setDisplay(!display)}
          aria-label="Toggle help"
        >
          ?<span>help</span>
        </button>
        
        <button 
          className="annotate-btn" 
          onClick={() => setAnnotate(!annotate)}
          aria-label="Toggle annotations"
        >
          i
        </button>

        {/* Annotations */}
        {annotate && item.annotations?.map((annotation, idx) => (
          <button
            key={idx}
            className="Hotspot"
            slot={annotation.slot}
            data-position={annotation.position}
            data-normal={annotation.normal}
            data-orbit={annotation.orbit}
            data-target={annotation.target}
            data-visibility-attribute="visible"
            onClick={() => handleAnnotateClick(annotation)}
          >
            <div className="HotspotAnnotation">{annotation.title}</div>
          </button>
        ))}
        
        {/* Variant selector */}
        <div className="controls variant_div">
          <select ref={variantRef} id={`variant-${item.id}`} aria-label="Select variant">
            <option value="Default">Default</option>
          </select>
        </div>
      </model-viewer>

      {/* Help overlay */}
      {display && (
        <>
          <button
            className={document.fullscreenElement ? "close fz" : "close"}
            onClick={() => setDisplay(false)}
            aria-label="Close help"
          >
            &#10006;
          </button>
          <Help />
        </>
      )}
        
      {/* Product details */}
      <div className="qr-sec">
        {!ARSupported && (
          <LazyLoadImage
            src={`https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=${encodeURIComponent(window.location.href)}`}
            alt="QR Code for AR view"
            effect="blur"
            height={110}
            width={110}
            loading="lazy"
          />
        )}

        <div className="product-details">
          <div className="product-info">
            <div className="pname">{item.name}</div>
            <div className="rating-sec">
              <div className="rating-label">Rating</div>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < 4 ? "star filled" : "star"}>
                    &#9733;
                  </span>
                ))}
              </div>
            </div>
            <div className="price">₹ 1,000</div>
            {!ARSupported && (
              <h5 className="qr-hint">Scan QR code for AR view on mobile</h5>
            )}
          </div>
          <button 
            className={`add-icon ${isInWishlist ? 'in-wishlist' : ''}`}
            onClick={handleAddToWishlist}
            aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {isInWishlist ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ModelViewer);