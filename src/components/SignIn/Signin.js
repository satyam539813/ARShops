import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SignIn = ({ onSignInSuccess, onAuthError }) => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [signInDetails, setSignInDetails] = useState({
        email: '',
        password: '',
    });

    const handleOnchange = (e) => {
        setSignInDetails({
            ...signInDetails,
            [e.target.name]: e.target.value
        });
        if (error) setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!signInDetails.email.trim()) {
            setError('Email is required');
            return;
        }
        
        if (!signInDetails.password) {
            setError('Password is required');
            return;
        }

        setLoading(true);

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const foundUser = users.find(user => user.email === signInDetails.email && user.password === signInDetails.password);

        setTimeout(() => {
            if (foundUser) {
                console.log('User signed in:', foundUser);
                localStorage.setItem('currentUser', JSON.stringify(foundUser));
                setSignInDetails({
                    email: '',
                    password: '',
                });
                setError('');
                onSignInSuccess(foundUser);
                navigate('/product');
            } else {
                setError('Invalid email or password.');
                onAuthError('Invalid email or password.');
            }
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 py-12">
            <motion.div
                className="w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h3 className="text-3xl font-bold text-white mb-2">Welcome back</h3>
                        <p className="text-slate-300">Sign in to your account</p>
                    </div>
                    
                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                            <p className="text-red-300 text-center">{error}</p>
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-white font-medium mb-2">
                                Email address
                            </label>
                            <input 
                                name="email" 
                                id="email" 
                                type="email"
                                placeholder="your@email.com" 
                                onChange={handleOnchange}
                                value={signInDetails.email}
                                autoComplete="email"
                                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="block text-white font-medium mb-2">
                                Password
                            </label>
                            <input 
                                name="password" 
                                id="password" 
                                type="password"
                                placeholder="••••••••" 
                                onChange={handleOnchange}
                                value={signInDetails.password}
                                autoComplete="current-password"
                                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                            />
                            <Link to="#" className="inline-block mt-2 text-purple-300 hover:text-purple-200 text-sm transition-colors duration-300">
                                Forgot password?
                            </Link>
                        </div>
                        
                        <button 
                            type="submit"
                            className={`w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg transform hover:scale-105 flex items-center justify-center ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                    Signing in...
                                </>
                            ) : (
                                'Sign in'
                            )}
                        </button>
                        
                        <p className="text-center text-slate-300">
                            Don't have an account?{' '}
                            <Link to="/sign-up" className="text-purple-300 hover:text-purple-200 font-medium transition-colors duration-300">
                                Create account
                            </Link>
                        </p>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default SignIn;