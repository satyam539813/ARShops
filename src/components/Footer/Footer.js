import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h3 style={{display:'flex',alignItems:'center',gap:'8px'}}>AR Shopsy
            <span aria-hidden="true" className="brand-anim">
              <lottie-player src="https://lottie.host/0f3118b8-6b78-4c2d-9a3b-6df2bf1e0b9a/4i5m9r0u8Q.json" background="transparent" speed="1" loop autoplay style={{width:'28px',height:'28px'}}></lottie-player>
            </span>
          </h3>
          <p>Experience shopping in a whole new dimension with our augmented reality platform.</p>
          <div className="social-icons">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaTwitter />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaInstagram />
            </a>
            <a href="https://github.com/Shivang-v-erm-a/Major-Project" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaGithub />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/product">Products</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <div className="footer-section">
          <h4>Customer Service</h4>
          <div className="footer-links">
            <Link to="/feedback">Feedback</Link>
            <Link to="/">FAQs</Link>
            <Link to="/">Shipping & Returns</Link>
            <Link to="/">Privacy Policy</Link>
          </div>
        </div>

        <div className="footer-section">
          <h4>Subscribe to Newsletter</h4>
          <p>Get the latest updates on new products and special deals</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your Email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom">
        <p>© 2025 AR Shopsy | All Rights Reserved</p>
      </div>

    </div>
  );
}

export default Footer;
