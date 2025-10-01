

import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheckIcon, SunIcon } from '../constants';
import { PRODUCTS, formatCurrency } from '../constants';
import ProductCard from './common/Card';

const HomePage = () => {
    const services = {
        "Sustainable Energy Installation": [
            "Solar Panels", "Batteries", "Inverters", "MPPT Charger Controller"
        ],
        "General Security": [
            "Walkie Talkie", "Stun Gun", "Car Tracker", "Fire Alarm", "Fire Extinguishers", "Video Door Phone", "Electric Fence Installation"
        ]
    };

    const coreValues = [
        { name: "Innovation", description: "Developing cutting-edge solar and security products." },
        { name: "Customer-Centricity", description: "Exceptional service and support for a positive customer experience." },
        { name: "Integrity", description: "Business conducted with honesty, transparency, and ethical conduct." },
        { name: "Sustainability", description: "Promoting sustainable practices to reduce environmental impact." },
    ];

    return (
        <div className="bg-white dark:bg-gray-900">
            {/* Hero Section */}
            <section className="relative bg-gray-800 text-white">
                <img src="https://images.pexels.com/photos/221016/pexels-photo-221016.jpeg" alt="Hero Background" className="absolute inset-0 w-full h-full object-cover opacity-30"/>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                        <span className="block">Secure Your Future,</span>
                        <span className="block text-orange-500">Power Your Life.</span>
                    </h1>
                    <p className="mt-6 max-w-lg mx-auto text-xl text-gray-300">
                        Leading provider of innovative solar and security solutions that empower people to live safer and more sustainable lives.
                    </p>
                    <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <Link to="/store" className="w-full sm:w-auto inline-block bg-orange-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition-colors shadow-lg">
                            Explore Products
                        </Link>
                        <Link to="/training" className="w-full sm:w-auto inline-block bg-gray-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-600 transition-colors shadow-lg">
                            View Courses
                        </Link>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Our Core Services</h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Comprehensive solutions tailored for your needs.</p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8">
                            <div className="flex items-center">
                                <SunIcon className="h-10 w-10 text-orange-500" />
                                <h3 className="ml-4 text-xl font-bold text-gray-900 dark:text-white">Sustainable Energy Installation</h3>
                            </div>
                            <ul className="mt-4 list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                                {services["Sustainable Energy Installation"].map(item => <li key={item}>{item}</li>)}
                            </ul>
                        </div>
                        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8">
                            <div className="flex items-center">
                                <ShieldCheckIcon className="h-10 w-10 text-blue-500" />
                                <h3 className="ml-4 text-xl font-bold text-gray-900 dark:text-white">General Security</h3>
                            </div>
                            <ul className="mt-4 list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                                {services["General Security"].map(item => <li key={item}>{item}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-16 sm:py-20 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Featured Products</h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Check out our top-selling items.</p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {PRODUCTS.slice(0, 3).map(product => (
                           <Link to={`/store`} key={product.id}>
                                <ProductCard item={product} type="product" />
                           </Link>
                        ))}
                    </div>
                     <div className="text-center mt-12">
                        <Link to="/store" className="text-orange-500 font-semibold hover:text-orange-600">
                            View All Products &rarr;
                        </Link>
                    </div>
                </div>
            </section>

             {/* Core Values Section */}
            <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Our Core Values</h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">The principles that guide our work.</p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {coreValues.map(value => (
                            <div key={value.name} className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{value.name}</h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-300">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="bg-orange-500">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        <span className="block">Ready to get started?</span>
                        <span className="block text-orange-900">Contact us for a free consultation.</span>
                    </h2>
                    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                        <div className="inline-flex rounded-md shadow">
                            <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-orange-600 bg-white hover:bg-orange-50">
                                Contact Sales
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;