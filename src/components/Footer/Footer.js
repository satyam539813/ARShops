import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <h3 className="text-2xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                AR Shopsy
              </h3>
              <div className="w-7 h-7 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Experience shopping in a whole new dimension with our augmented reality platform.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: FaTwitter, href: "https://twitter.com", color: "hover:text-blue-400" },
                { icon: FaFacebook, href: "https://facebook.com", color: "hover:text-blue-600" },
                { icon: FaInstagram, href: "https://instagram.com", color: "hover:text-pink-400" },
                { icon: FaGithub, href: "https://github.com/Shivang-v-erm-a/Major-Project", color: "hover:text-gray-300" }
              ].map(({ icon: Icon, href, color }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center text-slate-400 ${color} transition-all duration-300 hover:bg-white/20 hover:border-white/40 hover:scale-110`}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
            <div className="space-y-3">
              {[
                { label: "Home", path: "/" },
                { label: "About Us", path: "/about" },
                { label: "Products", path: "/product" },
                { label: "Contact", path: "/contact" }
              ].map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="block text-slate-400 hover:text-purple-300 transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Customer Service</h4>
            <div className="space-y-3">
              {[
                { label: "Feedback", path: "/feedback" },
                { label: "FAQs", path: "/" },
                { label: "Shipping & Returns", path: "/" },
                { label: "Privacy Policy", path: "/" }
              ].map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="block text-slate-400 hover:text-purple-300 transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Stay Updated</h4>
            <p className="text-slate-400 mb-4">
              Get the latest updates on new products and special deals
            </p>
            <form 
              className="space-y-3" 
              onSubmit={(e) => {
                e.preventDefault();
                // Handle newsletter subscription
              }}
            >
              <input
                type="email"
                placeholder="Your Email"
                required
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
              <button
                type="submit"
                className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-slate-400 text-center md:text-left">
              © 2025 AR Shopsy | All Rights Reserved
            </p>
            <div className="flex items-center space-x-6">
              <span className="text-slate-400">Made with</span>
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-slate-400">by the AR Shopsy Team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;