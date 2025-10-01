import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart, useAuth } from '../App.js';
import { TrashIcon, formatCurrency } from '../constants.js';
import Modal from './common/Modal.js';

// --- PAYSTACK MODAL ---
const PaystackModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    amount: number;
    email: string;
}> = ({ isOpen, onClose, onSuccess, amount, email }) => {
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            onSuccess();
        }, 2000); // Simulate network delay
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Complete Your Payment">
            <div className="text-center">
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">You are about to pay</p>
                <p className="text-4xl font-bold text-orange-500 mb-4">{formatCurrency(amount)}</p>
                <p className="text-sm text-gray-500 mb-6">to Eagleeyes Technology for your order.</p>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
                    <p className="font-semibold">{email}</p>
                </div>
                <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors shadow-md disabled:opacity-50"
                >
                    {isProcessing ? 'Processing...' : `Pay ${formatCurrency(amount)}`}
                </button>
                 <p className="text-xs text-gray-400 mt-4">This is a simulated payment process for demonstration.</p>
            </div>
        </Modal>
    );
};


// --- CHECKOUT PAGE ---
const CheckoutPage = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isPaystackOpen, setIsPaystackOpen] = useState(false);

    // State for shipping form
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            navigate('/login', { state: { from: location } });
            return;
        }
        setIsPaystackOpen(true);
    };

    const handlePaymentSuccess = () => {
        setIsPaystackOpen(false);
        navigate('/order-confirmation');
    };

    if (cartCount === 0) {
        return (
            <div className="text-center py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
                <p className="mt-4 text-gray-600 dark:text-gray-300">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/store" className="mt-6 inline-block bg-orange-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition-colors">
                    Start Shopping
                </Link>
            </div>
        );
    }
    
    return (
        <>
            <div className="bg-white dark:bg-gray-900 min-h-[calc(100vh-8rem)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items Column */}
                        <div className="lg:col-span-2 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
                            <div className="space-y-4">
                                {cart.map(({ item, quantity }) => (
                                    <div key={item.id} className="flex items-center justify-between border-b dark:border-gray-700 pb-4">
                                        <div className="flex items-center">
                                            <img src={item.imageUrl} alt={ 'name' in item ? item.name : item.title} className="w-20 h-20 object-cover rounded-md mr-4" />
                                            <div>
                                                <h3 className="font-semibold">{'name' in item ? item.name : item.title}</h3>
                                                <p className="text-sm text-gray-500">{formatCurrency(item.price)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <input 
                                                type="number" 
                                                min="1"
                                                value={quantity}
                                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                                                className="w-16 text-center border-gray-300 rounded-md dark:bg-gray-700"
                                            />
                                            <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary and Form Column */}
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow h-fit">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                             <div className="border-b dark:border-gray-700 pb-4 mb-4 space-y-2">
                                <div className="flex justify-between font-semibold">
                                    <span>Subtotal</span>
                                    <span>{formatCurrency(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between font-semibold">
                                    <span>Shipping</span>
                                    <span>FREE</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-orange-500">
                                    <span>Total</span>
                                    <span>{formatCurrency(cartTotal)}</span>
                                </div>
                            </div>
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <h3 className="text-lg font-semibold">Shipping Information</h3>
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium">Street Address</label>
                                    <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 focus:border-orange-500 focus:ring-orange-500"/>
                                </div>
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium">City</label>
                                    <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 focus:border-orange-500 focus:ring-orange-500"/>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="state" className="block text-sm font-medium">State / Province</label>
                                        <input type="text" id="state" value={state} onChange={(e) => setState(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 focus:border-orange-500 focus:ring-orange-500"/>
                                    </div>
                                    <div>
                                        <label htmlFor="postalCode" className="block text-sm font-medium">Postal Code</label>
                                        <input type="text" id="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 focus:border-orange-500 focus:ring-orange-500"/>
                                    </div>
                                </div>
                                <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors shadow-md mt-4">
                                    {user ? 'Proceed to Payment' : 'Login to Continue'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {user && (
                <PaystackModal
                    isOpen={isPaystackOpen}
                    onClose={() => setIsPaystackOpen(false)}
                    onSuccess={handlePaymentSuccess}
                    amount={cartTotal}
                    email={user.email}
                />
            )}
        </>
    );
};

export default CheckoutPage;

// --- ORDER CONFIRMATION PAGE ---
export const OrderConfirmationPage = () => {
    const { clearCart } = useCart();
    
    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <div className="text-center py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-green-500">Thank You For Your Order!</h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Your payment was successful. Your order has been placed and a confirmation email has been sent.</p>
            <Link to="/" className="mt-6 inline-block bg-orange-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition-colors">
                Continue Shopping
            </Link>
        </div>
    );
};