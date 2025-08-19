import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero__inner">
          <div className="about-hero__content">
            <h1>About AR Shopsy</h1>
            <p>
              AR Shopsy is an immersive e-commerce experience that lets you visualize
              products in your space using augmented reality. Our mission is to make
              shopping more confident, engaging, and fun.
            </p>
            <div className="about-cta">
              <Link to="/product" className="about-btn primary">Explore Products</Link>
              <Link to="/feedback" className="about-btn secondary">Give Feedback</Link>
            </div>
          </div>
          <div className="about-hero__art" aria-hidden="true">
            <lottie-player
              src="https://lottie.host/63b2a2b1-2b9a-4f8d-9b2f-0e89f7cb9c7f/1eUezmJQwF.json"
              background="transparent"
              speed="1"
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            ></lottie-player>
          </div>
        </div>
      </section>

      <section className="about-grid">
        <div className="about-card">
          <h3>Our Mission</h3>
          <p>
            To bridge the gap between online browsing and real-world experience by
            enabling customers to preview products in their own environment before
            purchase.
          </p>
        </div>
        <div className="about-card">
          <h3>What We Offer</h3>
          <ul>
            <li>AR previews powered by model-viewer</li>
            <li>Curated product collection</li>
            <li>Wishlist and easy sharing</li>
            <li>Responsive, smooth shopping flow</li>
          </ul>
        </div>
        <div className="about-card">
          <h3>Tech We Use</h3>
          <ul>
            <li>React + React Router</li>
            <li>Web Components: @google/model-viewer</li>
            <li>Shery.js micro-interactions</li>
            <li>React Toastify for feedback</li>
          </ul>
        </div>
      </section>

      <section className="about-team">
        <h2>Who We Are</h2>
        <p>
          We are a small team passionate about UX, web performance, and spatial
          computing. We believe AR can empower shoppers to make better decisions.
        </p>
        <div className="team-list">
          <div className="team-card">
            <div className="avatar" aria-hidden="true">A</div>
            <div>
              <h4>AR Experience Lead</h4>
              <p>Designs intuitive AR flows and product visualization.</p>
            </div>
          </div>
          <div className="team-card">
            <div className="avatar" aria-hidden="true">F</div>
            <div>
              <h4>Frontend Engineer</h4>
              <p>Builds smooth, accessible, and responsive UI.</p>
            </div>
          </div>
          <div className="team-card">
            <div className="avatar" aria-hidden="true">B</div>
            <div>
              <h4>Backend Integrations</h4>
              <p>Connects catalog, search, and analytics services.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-faq">
        <h2>FAQ</h2>
        <details>
          <summary>How do I view a product in AR?</summary>
          <p>
            Open a product that supports AR and tap the “View in your space” or AR button.
            On supported devices, you can place it directly in your room.
          </p>
        </details>
        <details>
          <summary>Do I need an app?</summary>
          <p>
            No app needed. We use web-based AR via compatible browsers and devices.
          </p>
        </details>
        <details>
          <summary>Where can I share feedback?</summary>
          <p>
            We value your thoughts. Use our <Link to="/feedback">Feedback</Link> page to
            suggest features or report issues.
          </p>
        </details>
      </section>

      <section className="about-footer-cta">
        <h3>Ready to try AR shopping?</h3>
        <Link to="/product" className="about-btn primary">Start Browsing</Link>
      </section>
    </div>
  );
};

export default About;
