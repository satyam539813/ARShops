import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const PaymentForm = ({ onPaymentSuccess, onPaymentCancel }) => {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvc: ''
    });
    const [netbankingDetails, setNetbankingDetails] = useState({
        bank: '',
        accountNumber: ''
    });
    const [upiDetails, setUpiDetails] = useState({
        upiId: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCardInputChange = (e) => {
        const { name, value } = e.target;
        setCardDetails({
            ...cardDetails,
            [name]: value
        });
        if (error) setError('');
    };

    const handleNetbankingInputChange = (e) => {
        const { name, value } = e.target;
        setNetbankingDetails({
            ...netbankingDetails,
            [name]: value
        });
        if (error) setError('');
    };

    const handleUpiInputChange = (e) => {
        const { name, value } = e.target;
        setUpiDetails({
            ...upiDetails,
            [name]: value
        });
        if (error) setError('');
    };

    const validateForm = () => {
        setError('');
        if (paymentMethod === 'card') {
            const { cardNumber, cardName, expiryDate, cvc } = cardDetails;
            if (!cardNumber || !cardName || !expiryDate || !cvc) {
                setError('All card fields are required.');
                return false;
            }
            if (!/^\d{16}$/.test(cardNumber)) {
                setError('Card number must be 16 digits.');
                return false;
            }
            if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
                setError('Expiry date must be in MM/YY format.');
                return false;
            }
            if (!/^\d{3,4}$/.test(cvc)) {
                setError('CVC must be 3 or 4 digits.');
                return false;
            }
        } else if (paymentMethod === 'netbanking') {
            const { bank, accountNumber } = netbankingDetails;
            if (!bank || !accountNumber) {
                setError('Bank and Account Number are required for Net Banking.');
                return false;
            }
        } else if (paymentMethod === 'upi') {
            const { upiId } = upiDetails;
            if (!upiId) {
                setError('UPI ID is required.');
                return false;
            }
            if (!/^[\w.-]+@[\w.-]+$/.test(upiId)) {
                setError('Invalid UPI ID format.');
                return false;
            }
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError('');

        setTimeout(() => {
            const success = Math.random() > 0.1;

            if (success) {
                toast.success("Payment successful! Your order has been placed.");
                onPaymentSuccess();
            } else {
                toast.error("Payment failed. Please try again.");
                setError("Payment processing failed. Please check your details.");
            }
            setLoading(false);
        }, 2000);
    };

    const paymentMethods = [
        { value: 'card', label: 'Credit/Debit Card', icon: '💳' },
        { value: 'netbanking', label: 'Net Banking', icon: '🏦' },
        { value: 'upi', label: 'UPI', icon: '📱' },
        { value: 'cod', label: 'Cash on Delivery', icon: '💵' }
    ];

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div 
                className="bg-slate-900/95 backdrop-blur-lg border border-white/10 rounded-2xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <h3 className="text-2xl font-bold text-white text-center mb-6">Choose Payment Method</h3>
                
                {error && (
                    <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                        <p className="text-red-300 text-center">{error}</p>
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Payment Method Selection */}
                    <div className="grid grid-cols-2 gap-3">
                        {paymentMethods.map((method) => (
                            <label
                                key={method.value}
                                className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
                                    paymentMethod === method.value
                                        ? 'border-purple-500 bg-purple-500/20'
                                        : 'border-white/20 hover:border-white/40 hover:bg-white/5'
                                }`}
                            >
                                <input
                                    type="radio"
                                    value={method.value}
                                    checked={paymentMethod === method.value}
                                    onChange={() => setPaymentMethod(method.value)}
                                    disabled={loading}
                                    className="sr-only"
                                />
                                <span className="text-2xl">{method.icon}</span>
                                <span className="text-white font-medium text-sm">{method.label}</span>
                            </label>
                        ))}
                    </div>

                    {/* Payment Method Forms */}
                    {paymentMethod === 'card' && (
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="cardNumber" className="block text-white font-medium mb-2">
                                    Card Number
                                </label>
                                <input
                                    type="text"
                                    id="cardNumber"
                                    name="cardNumber"
                                    value={cardDetails.cardNumber}
                                    onChange={handleCardInputChange}
                                    placeholder="•••• •••• •••• ••••"
                                    maxLength="16"
                                    disabled={loading}
                                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                />
                            </div>
                            <div>
                                <label htmlFor="cardName" className="block text-white font-medium mb-2">
                                    Cardholder Name
                                </label>
                                <input
                                    type="text"
                                    id="cardName"
                                    name="cardName"
                                    value={cardDetails.cardName}
                                    onChange={handleCardInputChange}
                                    placeholder="Full Name"
                                    disabled={loading}
                                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="expiryDate" className="block text-white font-medium mb-2">
                                        Expiry (MM/YY)
                                    </label>
                                    <input
                                        type="text"
                                        id="expiryDate"
                                        name="expiryDate"
                                        value={cardDetails.expiryDate}
                                        onChange={handleCardInputChange}
                                        placeholder="MM/YY"
                                        maxLength="5"
                                        disabled={loading}
                                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="cvc" className="block text-white font-medium mb-2">
                                        CVC
                                    </label>
                                    <input
                                        type="text"
                                        id="cvc"
                                        name="cvc"
                                        value={cardDetails.cvc}
                                        onChange={handleCardInputChange}
                                        placeholder="•••"
                                        maxLength="4"
                                        disabled={loading}
                                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {paymentMethod === 'netbanking' && (
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="bank" className="block text-white font-medium mb-2">
                                    Bank Name
                                </label>
                                <input
                                    type="text"
                                    id="bank"
                                    name="bank"
                                    value={netbankingDetails.bank}
                                    onChange={handleNetbankingInputChange}
                                    placeholder="e.g., State Bank of India"
                                    disabled={loading}
                                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                />
                            </div>
                            <div>
                                <label htmlFor="accountNumber" className="block text-white font-medium mb-2">
                                    Account Number
                                </label>
                                <input
                                    type="text"
                                    id="accountNumber"
                                    name="accountNumber"
                                    value={netbankingDetails.accountNumber}
                                    onChange={handleNetbankingInputChange}
                                    placeholder="Your Account Number"
                                    disabled={loading}
                                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                />
                            </div>
                        </div>
                    )}

                    {paymentMethod === 'upi' && (
                        <div>
                            <label htmlFor="upiId" className="block text-white font-medium mb-2">
                                UPI ID
                            </label>
                            <input
                                type="text"
                                id="upiId"
                                name="upiId"
                                value={upiDetails.upiId}
                                onChange={handleUpiInputChange}
                                placeholder="yourname@bankupi"
                                disabled={loading}
                                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                            />
                        </div>
                    )}

                    {paymentMethod === 'cod' && (
                        <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                            <p className="text-green-300 text-center">
                                You have selected Cash on Delivery. Please have the exact amount ready upon delivery.
                            </p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-4 pt-4">
                        <button 
                            type="button" 
                            onClick={onPaymentCancel} 
                            disabled={loading}
                            className="flex-1 px-6 py-3 border-2 border-white/20 text-white font-medium rounded-lg hover:bg-white/10 hover:border-white/40 transition-all duration-300 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className={`flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg flex items-center justify-center ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                    Processing...
                                </>
                            ) : (
                                'Confirm Order'
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default PaymentForm;