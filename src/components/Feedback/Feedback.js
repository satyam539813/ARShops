import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const Feedback = () => {
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    username: "",
    useremail: "",
    liked: "",
    improve: "",
    features: "",
    comments: ""
  });

  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    const totalFields = Object.keys(formState).length;
    const filledFields = Object.values(formState).filter(value => value.trim() !== "").length;
    setCompletionPercentage(Math.round((filledFields / totalFields) * 100));

    const script1 = document.createElement("script");
    script1.src = "https://smtpjs.com/v3/smtp.js";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://unpkg.com/sweetalert/dist/sweetalert.min.js";
    script2.async = true;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, [formState]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState({
      ...formState,
      [id]: value
    });
  };

  const sendMail = () => {
    setIsSubmitting(true);
    
    let body = "Name of the User: <br/>" + formState.username + "<br/>" + 
      "Email of the User: <br/>" + formState.useremail + "<br/><br/>" +
      "What did you like most about AR-Webstore? <br/>" + formState.liked +
      "<br/><br/> Will our 3D and AR features improve your shopping experience if we integrate it on an online e-commerce store ?<br/>" + formState.improve +
      "<br/><br/> What are the other features that excite you to have them on AR-Webstore ?<br/>" + formState.features +
      "<br/> <br/>Any other comments?<br/>" + formState.comments;

    window.Email.send({
      Host: "smtp.elasticemail.com",
      Username: "shwetkhatri2001@gmail.com",
      Password: "BAAF238142FDFE27699F12B3FC14B1A5C9F7",
      To: "shwetkhatri2001@gmail.com",
      From: "shwetkhatri2001@gmail.com",
      Subject: "AR-Webstore has got a feedback",
      Body: body,
    }).then((message) => {
        setIsSubmitting(false);
        if (message === "OK") {
          window.swal(
            "Thank You!",
            "We've received your valuable feedback",
            "success"
          ).then(() => {
            formRef.current.reset();
            setFormState({
              username: "",
              useremail: "",
              liked: "",
              improve: "",
              features: "",
              comments: ""
            });
          });
        } else {
          window.swal(
            "Something Wrong",
            "Your feedback could not be submitted. Please try again.",
            "error"
          );
        }
      });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const formVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1],
        delay: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div className="text-center mb-12" variants={formVariants}>
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4">
              Your Feedback
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto mb-6"></div>
            <p className="text-xl text-slate-300">Help us evolve with your valuable insights</p>
          </motion.div>

          {/* Form Container */}
          <motion.div 
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8"
            variants={formVariants}
          >
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-medium">Completion</span>
                <span className="text-purple-300 font-bold">{completionPercentage}%</span>
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <form ref={formRef} onSubmit={(e) => e.preventDefault()} className="space-y-6">
              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="username" className="block text-white font-medium mb-2">
                    Your Name
                  </label>
                  <input 
                    type="text" 
                    id="username" 
                    placeholder="Enter your name"
                    value={formState.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="useremail" className="block text-white font-medium mb-2">
                    Your Email
                  </label>
                  <input 
                    type="email" 
                    id="useremail" 
                    placeholder="Enter your email"
                    value={formState.useremail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              {/* Feedback Questions */}
              <div>
                <label htmlFor="liked" className="block text-white font-medium mb-2">
                  What did you like most about AR-Webstore?
                </label>
                <input 
                  type="text" 
                  id="liked" 
                  placeholder="Share what you enjoyed..."
                  value={formState.liked}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="improve" className="block text-white font-medium mb-2">
                  Will our 3D and AR features improve your shopping experience?
                </label>
                <input 
                  type="text" 
                  id="improve" 
                  placeholder="Tell us how it might enhance your experience..."
                  value={formState.improve}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="features" className="block text-white font-medium mb-2">
                  What other features would you like to see on AR-Webstore?
                </label>
                <input 
                  type="text" 
                  id="features" 
                  placeholder="Share your feature ideas..."
                  value={formState.features}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="comments" className="block text-white font-medium mb-2">
                  Any other comments or suggestions?
                </label>
                <textarea
                  id="comments"
                  rows={4}
                  placeholder="We'd love to hear your thoughts..."
                  value={formState.comments}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                ></textarea>
              </div>

              <button 
                type="button" 
                className={`w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg transform hover:scale-105 flex items-center justify-center space-x-2 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                onClick={sendMail}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Feedback</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Feedback;