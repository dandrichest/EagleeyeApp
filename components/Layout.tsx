import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../App.tsx';
import { useCart } from '../App.tsx';
import { MenuIcon, XIcon, UserCircleIcon, LogoIcon, ShoppingCartIcon } from '../constants.tsx';

const Logo = () => (
    <div className="flex items-center space-x-2">
        <LogoIcon className="h-10 w-auto" />
        <span className="text-2xl font-bold text-white tracking-tight">EAGLEEYES</span>
    </div>
);

const Header = () => {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Store', path: '/store' },
        { name: 'Training', path: '/training' },
        { name: 'Blog', path: '/blog' },
    ];

    const linkClass = "px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors";
    const activeLinkClass = "bg-gray-900 text-white";

    return (
        <header className="bg-gray-800 shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link to="/"><Logo /></Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navLinks.map(link => (
                                <NavLink key={link.name} to={link.path} className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''}`}>
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-4">
                            <Link to="/checkout" className="relative p-2 text-gray-300 hover:text-white">
                                <ShoppingCartIcon className="h-6 w-6" />
                                {cartCount > 0 && (
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            {user ? (
                                <div className="flex items-center space-x-4">
                                    {user.role === 'ADMIN' && (
                                        <Link to="/dashboard" className={linkClass}>Dashboard</Link>
                                    )}
                                    <div className="relative group">
                                        <button className="flex items-center space-x-2 text-gray-300">
                                            <UserCircleIcon className="h-8 w-8" />
                                            <span className="text-sm font-medium">{user.name}</span>
                                        </button>
                                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <Link to="/profile" className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                                                My Profile
                                            </Link>
                                            <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link to="/login" className={`${linkClass} bg-orange-500 hover:bg-orange-600 text-white`}>Login / Register</Link>
                            )}
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white">
                            {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map(link => (
                            <NavLink key={link.name} to={link.path} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                                {link.name}
                            </NavLink>
                        ))}
                         <div className="border-t border-gray-700 pt-4 mt-4">
                            {user ? (
                                <div>
                                    <div className="flex items-center px-5">
                                        <UserCircleIcon className="h-10 w-10 text-gray-400" />
                                        <div className="ml-3">
                                            <div className="text-base font-medium leading-none text-white">{user.name}</div>
                                            <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                                        </div>
                                    </div>
                                    <div className="mt-3 px-2 space-y-1">
                                        <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">My Profile</Link>
                                        {user.role === 'ADMIN' && (
                                            <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">Dashboard</Link>
                                        )}
                                         <Link to="/checkout" onClick={() => setIsMenuOpen(false)} className="flex justify-between items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                                            <span>Shopping Cart</span>
                                            {cartCount > 0 && <span className="bg-red-600 text-red-100 text-xs font-bold px-2 py-1 rounded-full">{cartCount}</span>}
                                        </Link>
                                        <button onClick={() => { logout(); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Login / Register</Link>
                                    <Link to="/checkout" onClick={() => setIsMenuOpen(false)} className="flex justify-between items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                                        <span>Shopping Cart</span>
                                        {cartCount > 0 && <span className="bg-red-600 text-red-100 text-xs font-bold px-2 py-1 rounded-full">{cartCount}</span>}
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold text-white">EAGLEEYES TECHNOLOGY</h3>
                        <p className="mt-2 text-sm">Providing innovative solar and security solutions for a safer, more sustainable future.</p>
                        <p className="mt-2 text-sm">RC:1850670</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white">Contact Us</h3>
                        <p className="mt-2 text-sm">Suite 0.18 Otibo Odinamadu Block, National Women Development, Opp. CBH HQ Central Business District Abuja</p>
                        <p className="mt-1 text-sm">Angi Junsction By First Baptist Church, Masaka</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                        <ul className="mt-2 space-y-1 text-sm">
                            <li><Link to="/store" className="hover:text-orange-500">Store</Link></li>
                            <li><Link to="/training" className="hover:text-orange-500">Training</Link></li>
                            <li><Link to="/blog" className="hover:text-orange-500">Blog</Link></li>
                            <li><Link to="/admin-login" className="hover:text-orange-500">Admin Login</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Eagleeyes Technology. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
};