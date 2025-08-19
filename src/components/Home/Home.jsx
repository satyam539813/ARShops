// Home.jsx
import React, { useEffect } from "react";
import "./LandingPage.css";
import Shery from "sheryjs";
import { Link } from "react-router-dom";

function Home() {
  useEffect(() => {
    // --- Shery Animations ---
    Shery.mouseFollower();

    Shery.makeMagnet(".magnet-target", {
      ease: "cubic-bezier(0.23, 1, 0.320, 1)",
      duration: 1,
    });

    Shery.textAnimate(".text-item", {
      style: 1,
      y: 10,
      delay: 0.1,
      duration: 2,
      ease: "cubic-bezier(0.23, 1, 0.320, 1)",
      multiplier: 0.1,
    });
  }, []);

  return (
      <div className="landing-page white-blue-theme">
        {/* Hero Section */}
        <div className="hero-container">
          <div className="text-structure">
            {["Experience", "AR Shopping"].map((item, index) => (
                <div className="masker" key={index}>
                  <div className="text-wrapper">
                    <h1 className="text-item magnet-target">{item}</h1>
                  </div>
                </div>
            ))}
          </div>

          <Link to="/product" className="cta-button blue-btn">
            Shop Now <span className="arrow">→</span>
          </Link>
        </div>
      </div>
  );
}

export default Home;