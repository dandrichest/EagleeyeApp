import React, { useState } from 'react';
import { useAuth } from '../App.tsx';
import { ORDER_HISTORY, formatCurrency } from '../constants.tsx';
import { UserCircleIcon, PencilIcon } from '../constants.tsx';
import Modal from './common/Modal.tsx';

const EditProfileModal: React.FC<{ user: any; onClose: () => void; onSave: (name: string) => void; }> = ({ user, onClose, onSave }) => {
    const [name, setName] = useState(user.name);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(name);
        onClose();
    };

    return (
        <Modal isOpen={true} onClose={onClose} title="Edit Profile">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
                    />
                </div>
                 <div className="pt-4 flex justify-end space-x-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">Cancel</button>
                    <button type="submit" className="px-4 py-2 rounded-md text-white bg-orange-500 hover:bg-orange-600">Save Changes</button>
                </div>
            </form>
        </Modal>
    );
};


const ProfilePage = () => {
    const { user, updateUserProfile } = useAuth();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    
    if (!user) {
        return <div>Loading...</div>; // Or redirect
    }

    const handleSaveProfile = (newName: string) => {
        updateUserProfile(user.id, newName);
    };

    const getStatusColor = (status: 'Delivered' | 'Processing' | 'Cancelled') => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'Processing': return 'bg-yellow-100 text-yellow-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900 min-h-[calc(100vh-8rem)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="md:col-span-1">
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow text-center">
                            <UserCircleIcon className="w-24 h-24 mx-auto text-gray-400" />
                            <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
                            <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                            <p className="mt-1 text-sm font-medium text-orange-500 capitalize">{user.role.toLowerCase()}</p>
                            <button
                                onClick={() => setIsEditModalOpen(true)}
                                className="mt-6 w-full flex items-center justify-center bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                <PencilIcon className="w-4 h-4 mr-2" />
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* Order History */}
                    <div className="md:col-span-2">
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Order History</h2>
                            <div className="space-y-6">
                                {ORDER_HISTORY.length > 0 ? ORDER_HISTORY.map(order => (
                                    <div key={order.id} className="border-b dark:border-gray-700 pb-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <div>
                                                <p className="font-bold">Order #{order.id}</p>
                                                <p className="text-sm text-gray-500">Date: {new Date(order.date).toLocaleDateString()}</p>
                                            </div>
                                            <div className="text-right">
                                                 <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                                <p className="font-bold">{formatCurrency(order.total)}</p>
                                            </div>
                                        </div>
                                        <ul className="text-sm space-y-1">
                                            {order.items.map(cartItem => (
                                                <li key={cartItem.item.id}>
                                                    {cartItem.quantity} x {'name' in cartItem.item ? cartItem.item.name : cartItem.item.title}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )) : (
                                    <p className="text-gray-500">You have no past orders.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isEditModalOpen && <EditProfileModal user={user} onClose={() => setIsEditModalOpen(false)} onSave={handleSaveProfile} />}
        </div>
    );
};

export default ProfilePage;