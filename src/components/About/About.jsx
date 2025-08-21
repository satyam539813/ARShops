import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const features = [
    {
      icon: "🎯",
      title: "Our Mission",
      description: "To bridge the gap between online browsing and real-world experience by enabling customers to preview products in their own environment before purchase."
    },
    {
      icon: "🚀",
      title: "What We Offer",
      items: [
        "AR previews powered by model-viewer",
        "Curated product collection",
        "Wishlist and easy sharing",
        "Responsive, smooth shopping flow"
      ]
    },
    {
      icon: "⚡",
      title: "Tech We Use",
      items: [
        "React + React Router",
        "Web Components: @google/model-viewer",
        "Framer Motion animations",
        "Tailwind CSS styling"
      ]
    }
  ];

  const team = [
    {
      initial: "S",
      role: "AR Experience Lead",
      description: "Designs intuitive AR flows and product visualization.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      initial: "F",
      role: "Frontend Engineer",
      description: "Builds smooth, accessible, and responsive UI.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      initial: "B",
      role: "Backend Integrations",
      description: "Connects catalog, search, and analytics services.",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const faqs = [
    {
      question: "How do I view a product in AR?",
      answer: "Open a product that supports AR and tap the 'View in your space' or AR button. On supported devices, you can place it directly in your room."
    },
    {
      question: "Do I need an app?",
      answer: "No app needed. We use web-based AR via compatible browsers and devices."
    },
    {
      question: "Where can I share feedback?",
      answer: "We value your thoughts. Use our Feedback page to suggest features or report issues."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.section 
          className="text-center mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6"
            variants={itemVariants}
          >
            About AR Shopsy
          </motion.h1>
          <motion.p 
            className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8"
            variants={itemVariants}
          >
            AR Shopsy is an immersive e-commerce experience that lets you visualize
            products in your space using augmented reality. Our mission is to make
            shopping more confident, engaging, and fun.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            variants={itemVariants}
          >
            <Link 
              to="/product" 
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg rounded-full hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              Explore Products
            </Link>
            <Link 
              to="/feedback" 
              className="px-8 py-4 border-2 border-white/20 text-white font-bold text-lg rounded-full hover:bg-white/10 hover:border-white/40 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
            >
              Give Feedback
            </Link>
          </motion.div>
        </motion.section>

        {/* Features Grid */}
        <motion.section 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              variants={itemVariants}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              {feature.description ? (
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              ) : (
                <ul className="space-y-2">
                  {feature.items?.map((item, idx) => (
                    <li key={idx} className="text-slate-300 flex items-center">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </motion.section>

        {/* Team Section */}
        <motion.section 
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-4xl font-bold text-white mb-4">Who We Are</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              We are a small team passionate about UX, web performance, and spatial
              computing. We believe AR can empower shoppers to make better decisions.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                variants={itemVariants}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${member.gradient} rounded-full flex items-center justify-center text-white font-bold text-xl`}>
                    {member.initial}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">{member.role}</h4>
                  </div>
                </div>
                <p className="text-slate-300">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section 
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            className="text-4xl font-bold text-white text-center mb-12"
            variants={itemVariants}
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.details
                key={index}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                variants={itemVariants}
              >
                <summary className="text-lg font-semibold text-white cursor-pointer hover:text-purple-300 transition-colors duration-300">
                  {faq.question}
                </summary>
                <p className="text-slate-300 mt-4 leading-relaxed">
                  {faq.answer}
                  {faq.question.includes("feedback") && (
                    <Link to="/feedback" className="text-purple-400 hover:text-purple-300 ml-1">
                      Feedback
                    </Link>
                  )}
                </p>
              </motion.details>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="text-center bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-lg border border-white/10 rounded-2xl p-12"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h3 className="text-3xl font-bold text-white mb-4">Ready to try AR shopping?</h3>
          <p className="text-slate-300 mb-8">Experience the future of e-commerce today</p>
          <Link 
            to="/product" 
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg rounded-full hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            Start Browsing
          </Link>
        </motion.section>
      </div>
    </div>
  );
};

export default About;