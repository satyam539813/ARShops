import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SignUp = ({ onSignUpSuccess, onAuthError }) => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    });

    const handleOnchange = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        });
        if (error) setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (userDetails.confirm_password === '' || userDetails.password === '' || userDetails.email === '' || userDetails.name === '') {
            setError('Please fill in all the required fields');
            return;
        }
        
        if (userDetails.password !== userDetails.confirm_password) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.email === userDetails.email);

        setTimeout(() => {
            if (userExists) {
                setError('User with this email already exists.');
                onAuthError('User with this email already exists.');
                setLoading(false);
                return;
            }

            const newUser = {
                name: userDetails.name,
                email: userDetails.email,
                password: userDetails.password
            };
            localStorage.setItem('users', JSON.stringify([...users, newUser]));

            console.log('User signed up:', newUser);
            setUserDetails({
                name: '',
                email: '',
                password: '',
                confirm_password: ''
            });
            setError('');
            onSignUpSuccess(newUser);
            navigate('/sign-in');
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
                        <h3 className="text-3xl font-bold text-white mb-2">Create Account</h3>
                        <p className="text-slate-300">Join AR Shopsy today</p>
                    </div>
                    
                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                            <p className="text-red-300 text-center">{error}</p>
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-white font-medium mb-2">
                                Full Name
                            </label>
                            <input 
                                name="name" 
                                id="name" 
                                type="text"
                                placeholder="Enter your full name"
                                onChange={handleOnchange}
                                value={userDetails.name}
                                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                            />
                        </div>
                        
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
                                value={userDetails.email}
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
                                placeholder="Create a password"
                                onChange={handleOnchange}
                                value={userDetails.password}
                                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="confirm_password" className="block text-white font-medium mb-2">
                                Confirm Password
                            </label>
                            <input 
                                name="confirm_password" 
                                id="confirm_password" 
                                type="password"
                                placeholder="Confirm your password"
                                onChange={handleOnchange}
                                value={userDetails.confirm_password}
                                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                            />
                        </div>
                        
                        <button 
                            type="submit"
                            className={`w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg transform hover:scale-105 flex items-center justify-center ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                    Creating account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                        
                        <p className="text-center text-slate-300">
                            Already have an account?{' '}
                            <Link to="/sign-in" className="text-purple-300 hover:text-purple-200 font-medium transition-colors duration-300">
                                Sign in
                            </Link>
                        </p>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default SignUp;