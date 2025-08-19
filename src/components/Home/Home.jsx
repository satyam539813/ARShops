// Home.jsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./LandingPage.css";

function Home() {
    const mountRef = useRef(null);

    useEffect(() => {
        // Scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        // Camera (slightly closer)
        const camera = new THREE.PerspectiveCamera(
            75,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 1, 2);

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(
            mountRef.current.clientWidth,
            mountRef.current.clientHeight
        );
        mountRef.current.appendChild(renderer.domElement);

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        // --- Point Light Following Cursor (intensity 5) ---
        const pointLight = new THREE.PointLight(0xffffff, 5, 100);
        pointLight.position.set(0, 0, 3);
        scene.add(pointLight);

        const onMouseMove = (event) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;
            pointLight.position.x = x * 5;
            pointLight.position.y = y * 5;
        };
        window.addEventListener("mousemove", onMouseMove);

        // GLTF + DRACO Loader
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
                model.scale.set(0.5, 0.5, 0.5);
                model.position.set(0, 0, 0);
                scene.add(model);
            },
            (xhr) => {
                console.log(
                    `Loading: ${xhr.total ? (xhr.loaded / xhr.total) * 100 : 0}% loaded`
                );
            },
            (error) => {
                console.error("❌ Error loading GLB:", error);
            }
        );

        // Animate
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // Resize
        const handleResize = () => {
            renderer.setSize(
                mountRef.current.clientWidth,
                mountRef.current.clientHeight
            );
            camera.aspect =
                mountRef.current.clientWidth / mountRef.current.clientHeight;
            camera.updateProjectionMatrix();
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", onMouseMove);
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div className="canvas-wrap">
            <div className="canvas-container" ref={mountRef} />
            <div className="overlay-title">AR SHOPSY</div>
        </div>
    );
}

export default Home;
