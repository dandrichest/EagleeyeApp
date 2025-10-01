import React, { useState } from 'react';
import { Product, Course, BlogPost, User, UserRole } from '../types';
import { PRODUCTS, COURSES, BLOG_POSTS } from '../constants';
import { PencilIcon, TrashIcon } from '../constants';
import Modal from './common/Modal';
import { useAuth } from '../App';

type Tab = 'inventory' | 'courses' | 'blog' | 'users';
type ManagedItem = Product | Course | BlogPost;

// --- Confirmation Dialog ---
const ConfirmationDialog: React.FC<{ onConfirm: () => void; onCancel: () => void; itemName: string }> = ({ onConfirm, onCancel, itemName }) => (
    <Modal isOpen={true} onClose={onCancel} title="Confirm Deletion">
        <p>Are you sure you want to delete "{itemName}"? This action cannot be undone.</p>
        <div className="mt-6 flex justify-end space-x-4">
            <button onClick={onCancel} className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">Cancel</button>
            <button onClick={onConfirm} className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700">Delete</button>
        </div>
    </Modal>
);

// --- Main Dashboard ---
const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState<Tab>('inventory');
    const [inventory, setInventory] = useState<Product[]>(PRODUCTS);
    const [courses, setCourses] = useState<Course[]>(COURSES);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>(BLOG_POSTS);
    const { users, updateUserRole } = useAuth();


    const renderContent = () => {
        switch (activeTab) {
            case 'inventory':
                return <Manager title="Product" items={inventory} setItems={setInventory} />;
            case 'courses':
                return <Manager title="Course" items={courses} setItems={setCourses} />;
            case 'blog':
                return <Manager title="Blog Post" items={blogPosts} setItems={setBlogPosts} />;
            case 'users':
                return <UserManager items={users} onRoleChange={updateUserRole} />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900 min-h-[calc(100vh-8rem)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                <div className="border-b border-gray-200 dark:border-gray-700 mt-4">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        <TabButton name="Inventory" tab="inventory" activeTab={activeTab} setActiveTab={setActiveTab} />
                        <TabButton name="Courses" tab="courses" activeTab={activeTab} setActiveTab={setActiveTab} />
                        <TabButton name="Blog" tab="blog" activeTab={activeTab} setActiveTab={setActiveTab} />
                        <TabButton name="Users" tab="users" activeTab={activeTab} setActiveTab={setActiveTab} />
                    </nav>
                </div>
                <div className="mt-8">{renderContent()}</div>
            </div>
        </div>
    );
};

// --- Tab Button ---
const TabButton: React.FC<{ name: string; tab: Tab; activeTab: Tab; setActiveTab: (tab: Tab) => void }> = ({ name, tab, activeTab, setActiveTab }) => {
    const isActive = activeTab === tab;
    return (
        <button
            onClick={() => setActiveTab(tab)}
            className={`${isActive
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
        >
            {name}
        </button>
    );
};


// --- Generic Manager Component ---
const Manager: React.FC<{ title: string; items: ManagedItem[]; setItems: React.Dispatch<React.SetStateAction<any[]>> }> = ({ title, items, setItems }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<ManagedItem | null>(null);
    const [itemToDelete, setItemToDelete] = useState<ManagedItem | null>(null);

    const handleAddItem = () => {
        setCurrentItem({} as ManagedItem); // Start with empty object
        setIsModalOpen(true);
    };

    const handleEditItem = (item: ManagedItem) => {
        setCurrentItem(item);
        setIsModalOpen(true);
    };

    const handleDeleteItem = (item: ManagedItem) => {
        setItemToDelete(item);
    };

    const confirmDelete = () => {
        if (itemToDelete) {
            setItems(items.filter(i => i.id !== itemToDelete.id));
            setItemToDelete(null);
        }
    };

    const handleSave = (formData: ManagedItem) => {
        if (formData.id) { // Editing existing
            setItems(items.map(item => item.id === formData.id ? formData : item));
        } else { // Adding new
            setItems([...items, { ...formData, id: `new_${Date.now()}` }]);
        }
        setIsModalOpen(false);
        setCurrentItem(null);
    };

    const renderTable = () => {
        if (items.length === 0) return <p>No items found.</p>;
        const headers = Object.keys(items[0]).filter(k => k !== 'description' && k !== 'content' && k !== 'imageUrl' && k !== 'specs' && k !== 'modules' && k !== 'tags' && k !== 'id');
        
        return (
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800">
                    <thead>
                        <tr className="w-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-sm leading-normal">
                            {headers.map(h => <th key={h} className="py-3 px-6 text-left">{h}</th>)}
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 dark:text-gray-200 text-sm font-light">
                        {items.map(item => (
                            <tr key={item.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                {headers.map(h => <td key={h} className="py-3 px-6 text-left whitespace-nowrap">{(item as any)[h]}</td>)}
                                <td className="py-3 px-6 text-center">
                                    <div className="flex item-center justify-center space-x-4">
                                        <button onClick={() => handleEditItem(item)} className="text-blue-500 hover:text-blue-700"><PencilIcon className="w-5 h-5"/></button>
                                        <button onClick={() => handleDeleteItem(item)} className="text-red-500 hover:text-red-700"><TrashIcon className="w-5 h-5"/></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div>
            <button onClick={handleAddItem} className="mb-4 bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors">Add {title}</button>
            {renderTable()}
            {isModalOpen && <ItemFormModal item={currentItem} onSave={handleSave} onClose={() => setIsModalOpen(false)} title={title}/>}
            {itemToDelete && <ConfirmationDialog onConfirm={confirmDelete} onCancel={() => setItemToDelete(null)} itemName={(itemToDelete as any).name || (itemToDelete as any).title} />}
        </div>
    );
};

// --- Item Form Modal ---
const ItemFormModal: React.FC<{item: any; onSave: (data: any) => void; onClose: () => void, title: string}> = ({ item, onSave, onClose, title }) => {
    const [formData, setFormData] = useState(item || {});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const parsedValue = type === 'number' ? parseFloat(value) : value;
        setFormData({ ...formData, [name]: parsedValue });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };
    
    // Simple way to determine fields, would be more robust in a real app
    const fields = Object.keys(item.id ? item : (PRODUCTS[0] && title === 'Product' ? PRODUCTS[0] : (COURSES[0] && title === 'Course' ? COURSES[0] : BLOG_POSTS[0]))).filter(key => key !== 'id' && typeof item[key] !== 'object' );

    return (
        <Modal isOpen={true} onClose={onClose} title={item.id ? `Edit ${title}` : `Add ${title}`}>
            <form onSubmit={handleSubmit} className="space-y-4">
                {fields.map(key => (
                     <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{key}</label>
                        <input
                            type={typeof formData[key] === 'number' ? 'number' : 'text'}
                            name={key}
                            value={formData[key] || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
                            />
                    </div>
                ))}
                 <div className="pt-4 flex justify-end space-x-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">Cancel</button>
                    <button type="submit" className="px-4 py-2 rounded-md text-white bg-orange-500 hover:bg-orange-600">Save</button>
                </div>
            </form>
        </Modal>
    );
};

// --- User Manager ---
const UserManager = ({ items, onRoleChange }: { items: User[]; onRoleChange: (userId: string, newRole: UserRole) => void }) => {
    const { user: currentUser } = useAuth();
    
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800">
                <thead>
                    <tr className="w-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Email</th>
                        <th className="py-3 px-6 text-center">Role</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-200 text-sm font-light">
                    {items.map(user => (
                        <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="py-3 px-6 text-left whitespace-nowrap">{user.name}</td>
                            <td className="py-3 px-6 text-left">{user.email}</td>
                            <td className="py-3 px-6 text-center">
                                <select 
                                    value={user.role} 
                                    onChange={(e) => onRoleChange(user.id, e.target.value as UserRole)}
                                    disabled={user.id === currentUser?.id}
                                    className="px-2 py-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-orange-500 focus:border-orange-500 disabled:opacity-50"
                                >
                                    {Object.values(UserRole).map(role => (
                                        <option key={role} value={role}>{role}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DashboardPage;
