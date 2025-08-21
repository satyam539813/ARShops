import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from "framer-motion";
import PaymentForm from '../PaymentForm/PaymentForm';

const WishList = ({ wishlist, onRemoveItem }) => {
  const [fadeOutId, setFadeOutId] = useState(null);
  const isEmpty = wishlist.length === 0;
  const [currentUser, setCurrentUser] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleRemoveItem = (id) => {
    setFadeOutId(id);
    setTimeout(() => {
      onRemoveItem(id);
      setFadeOutId(null);
    }, 300);
  };

  const handleProceedToCheckout = () => {
    if (!currentUser) {
      toast.error("Please sign in to proceed with the checkout.");
      return;
    }

    if (wishlist.length === 0) {
      toast.error("Your cart is empty. Add some products before checking out!");
      return;
    }
    setShowPaymentForm(true);
  };

  const handlePaymentSuccess = () => {
    wishlist.forEach(item => onRemoveItem(item.id));
    setShowPaymentForm(false);
  };

  const handlePaymentCancel = () => {
    setShowPaymentForm(false);
    toast.info("Payment cancelled.");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: {
      x: -100,
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const EmptyWishlist = () => (
    <motion.div 
      className="text-center py-20"
      variants={itemVariants}
    >
      <div className="text-6xl mb-6">🛒</div>
      <h3 className="text-2xl font-bold text-white mb-4">Your cart is empty</h3>
      <p className="text-slate-400 mb-8">Find something you love and add it here.</p>
      <Link 
        to="/product" 
        className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg rounded-full hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
      >
        Browse Products
      </Link>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4">
              My Cart
            </h1>
            <p className="text-xl text-slate-300">
              {isEmpty ? "Your shopping cart awaits" : `${wishlist.length} item${wishlist.length > 1 ? 's' : ''} in your cart`}
            </p>
          </motion.div>

          {/* Cart Content */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
            {isEmpty ? (
              <EmptyWishlist />
            ) : (
              <>
                {/* Cart Items */}
                <div className="space-y-4 mb-8">
                  <AnimatePresence>
                    {wishlist.map((item) => (
                      <motion.div
                        key={item.id}
                        className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 ${fadeOutId === item.id ? 'opacity-50' : ''}`}
                        variants={itemVariants}
                        exit="exit"
                        layout
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div 
                              className="w-4 h-4 rounded-full border-2 border-white/30"
                              style={{ 
                                backgroundColor: item.color?.toLowerCase() === 'red' ? '#ef4444' : 
                                               item.color?.toLowerCase() === 'blue' ? '#3b82f6' : 
                                               item.color?.toLowerCase() === 'green' ? '#10b981' : 
                                               item.color?.toLowerCase() === 'orange' ? '#f97316' :
                                               item.color?.toLowerCase() === 'black' ? '#1f2937' :
                                               '#6366f1'
                              }}
                            />
                            <div>
                              <h3 className="text-xl font-bold text-white">{item.name}</h3>
                              <div className="flex items-center space-x-4 mt-1">
                                <span className="text-slate-400">Category: {item.category}</span>
                                <span className="text-slate-400">Color: {item.color}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <span className="text-2xl font-bold text-white">₹1,000</span>
                            <button 
                              onClick={() => handleRemoveItem(item.id)}
                              className="px-4 py-2 bg-red-500/20 text-red-300 border border-red-500/30 rounded-lg hover:bg-red-500/30 hover:border-red-500/50 transition-all duration-300"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Cart Summary */}
                <div className="border-t border-white/10 pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-2xl font-bold text-white">
                      Total: ₹{(wishlist.length * 1000).toLocaleString()}
                    </div>
                    <div className="text-slate-400">
                      {wishlist.length} item{wishlist.length > 1 ? 's' : ''}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                      to="/product" 
                      className="flex-1 px-6 py-4 border-2 border-white/20 text-white font-bold text-lg rounded-lg hover:bg-white/10 hover:border-white/40 transition-all duration-300 text-center"
                    >
                      Continue Shopping
                    </Link>
                    <button 
                      onClick={handleProceedToCheckout}
                      className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg transform hover:scale-105"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Payment Form Modal */}
      {showPaymentForm && (
        <PaymentForm 
          onPaymentSuccess={handlePaymentSuccess} 
          onPaymentCancel={handlePaymentCancel} 
        />
      )}
    </div>
  );
};

export default WishList;