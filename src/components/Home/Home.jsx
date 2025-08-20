import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Link } from "react-router-dom";
import "./LandingPage.css";

function Home() {
    const mountRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0a0a0a);

        // Camera
        const camera = new THREE.PerspectiveCamera(
            75,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 1, 3);

        // Renderer with enhanced settings
        const renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(
            mountRef.current.clientWidth,
            mountRef.current.clientHeight
        );
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        mountRef.current.appendChild(renderer.domElement);

        // Enhanced lighting setup
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        scene.add(directionalLight);

        // Point light following cursor
        const pointLight = new THREE.PointLight(0x6366f1, 3, 100);
        pointLight.position.set(0, 0, 3);
        scene.add(pointLight);

        // Mouse interaction
        const onMouseMove = (event) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;
            pointLight.position.x = x * 5;
            pointLight.position.y = y * 5;
        };
        window.addEventListener("mousemove", onMouseMove);

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = true;
        controls.enablePan = false;
        controls.maxPolarAngle = Math.PI / 2;

        // GLTF Loader with progress tracking
        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath(
            "https://www.gstatic.com/draco/versioned/decoders/1.5.6/"
        );
        loader.setDRACOLoader(dracoLoader);

        loader.load(
            "/scene.glb",
            (gltf) => {
                const model = gltf.scene;
                model.scale.set(0.6, 0.6, 0.6);
                model.position.set(0, -0.5, 0);
                
                // Enable shadows
                model.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        if (child.material) {
                            child.material.needsUpdate = true;
                        }
                    }
                });
                
                scene.add(model);
                setIsLoading(false);
            },
            (xhr) => {
                if (xhr.lengthComputable) {
                    const progress = (xhr.loaded / xhr.total) * 100;
                    setLoadingProgress(progress);
                }
            },
            (error) => {
                console.error("Error loading GLB:", error);
                setIsLoading(false);
            }
        );

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // Resize handler
        const handleResize = () => {
            if (!mountRef.current) return;
            
            const width = mountRef.current.clientWidth;
            const height = mountRef.current.clientHeight;
            
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };
        window.addEventListener("resize", handleResize);

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", onMouseMove);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return (
        <div className="canvas-wrap">
            <div className="canvas-container" ref={mountRef} />
            
            {isLoading && (
                <div className="loading-overlay">
                    <div className="loading-content">
                        <div className="loading-spinner"></div>
                        <div className="loading-text">Loading AR Experience</div>
                        <div className="loading-progress">
                            <div 
                                className="loading-progress-bar" 
                                style={{ width: `${loadingProgress}%` }}
                            ></div>
                        </div>
                        <div className="loading-percentage">{Math.round(loadingProgress)}%</div>
                    </div>
                </div>
            )}
            
            <div className="overlay-content">
                <div className="hero-section">
                    <h1 className="hero-title">AR SHOPSY</h1>
                    <p className="hero-subtitle">Experience Shopping in Augmented Reality</p>
                    <div className="hero-actions">
                        <Link to="/product" className="cta-button primary">
                            Explore Products
                        </Link>
                        <Link to="/about" className="cta-button secondary">
                            Learn More
                        </Link>
                    </div>
                </div>
                
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🔮</div>
                        <h3>AR Preview</h3>
                        <p>See products in your space before buying</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📱</div>
                        <h3>Mobile Ready</h3>
                        <p>Works seamlessly on all devices</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3>Fast & Smooth</h3>
                        <p>Optimized for performance</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;