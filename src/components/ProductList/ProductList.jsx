// ProductList.jsx
import React, { useState, useEffect } from "react";
import productItems from "../../data/ProductItems";
import ModelViewer from "../ModelViewer/ModelViewer";
import { motion } from "framer-motion";
import Shery from "sheryjs";
import "./ProductList.css";

const ProductList = ({ addToWishlist, wishlist, removeFromWishlist }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      Shery.makeMagnet(".product-title", {
        ease: "cubic-bezier(0.23, 1, 0.32, 1)",
        duration: 1,
      });
    }, 100);

    setIsLoaded(true);
    return () => clearTimeout(timeout);
  }, []);

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.45 } },
  };

  return (
    <div className="products-page">
      {/* Header */}
      <div className="products-header">
        <h1 className="product-title magnet-target">Our Products</h1>
        <p className="products-sub">Explore our collection with immersive AR previews</p>
      </div>

      {/* Products Grid */}
      <motion.div
        className="products-grid"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {productItems.map((item) => (
          <motion.div key={item.id} className="product-card" variants={itemVariants}>
            {/* Model Viewer handles media, QR hint, and wishlist button */}
            <ModelViewer
              item={item}

              addToWishlist={addToWishlist}
              wishlist={wishlist}
              removeFromWishlist={removeFromWishlist}
            />

            {/* Basic product meta under the viewer */}
            <div className="product-meta">
              <div className="meta-left">
                <div className="product-name">{item.name}</div>
                <div className="product-tags">
                  <span className="tag">{item.category}</span>
                  {item.color && <span className="dot" style={{ backgroundColor: '#64748b' }} title={item.color}></span>}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProductList;
