import React, { useState, useMemo } from 'react';
import { Product } from '../types.ts';
import { PRODUCTS, formatCurrency } from '../constants.tsx';
import Card from './common/Card.tsx';
import Modal from './common/Modal.tsx';
import { useCart } from '../App.tsx';

const ProductDetailModal: React.FC<{ product: Product | null; onClose: () => void }> = ({ product, onClose }) => {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    if (!product) return null;

    const handleAddToCart = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <Modal isOpen={!!product} onClose={onClose} title={product.name}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover rounded-lg" />
                <div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
                    <div className="text-3xl font-bold text-orange-500 mb-4">{formatCurrency(product.price)}</div>
                    <div className="mb-4">
                        <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                        </span>
                    </div>
                    <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-100">Specifications</h4>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                        {Object.entries(product.specs).map(([key, value]) => (
                            <li key={key}><strong>{key}:</strong> {value}</li>
                        ))}
                    </ul>
                     <button 
                        onClick={handleAddToCart}
                        className={`mt-6 w-full text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md disabled:bg-gray-400 ${added ? 'bg-green-500' : 'bg-orange-500 hover:bg-orange-600'}`} 
                        disabled={product.stock === 0 || added}
                     >
                        {added ? 'Added to Cart!' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </Modal>
    );
};


const StorePage = () => {
    const [products] = useState<Product[]>(PRODUCTS);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceRange, setPriceRange] = useState(12000000);
    const [sortBy, setSortBy] = useState('name-asc');


    const categories = useMemo(() => ['All', ...new Set(PRODUCTS.map(p => p.category))], []);
    const maxPrice = useMemo(() => Math.max(...PRODUCTS.map(p => p.price)), []);

    const filteredAndSortedProducts = useMemo(() => {
        return products
            .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
            .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase()))
            .filter(p => p.price <= priceRange)
            .sort((a, b) => {
                switch (sortBy) {
                    case 'price-asc': return a.price - b.price;
                    case 'price-desc': return b.price - a.price;
                    case 'name-desc': return b.name.localeCompare(a.name);
                    case 'name-asc':
                    default:
                        return a.name.localeCompare(b.name);
                }
            });
    }, [products, selectedCategory, searchTerm, priceRange, sortBy]);
    
    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Our Products</h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">High-quality security and solar energy solutions.</p>
                </div>

                {/* Filters */}
                <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                         <div className="w-full">
                            <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Search</label>
                            <input
                                id="search"
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                            <select
                                id="category"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-orange-500 focus:border-orange-500"
                            >
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        <div className="w-full">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Max Price: {formatCurrency(priceRange)}</label>
                             <input
                                id="price"
                                type="range"
                                min="0"
                                max={maxPrice}
                                value={priceRange}
                                onChange={e => setPriceRange(Number(e.target.value))}
                                className="mt-1 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sort By</label>
                            <select
                                id="sort"
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value)}
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-orange-500 focus:border-orange-500"
                            >
                                <option value="name-asc">Name (A-Z)</option>
                                <option value="name-desc">Name (Z-A)</option>
                                <option value="price-asc">Price (Low to High)</option>
                                <option value="price-desc">Price (High to Low)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                {filteredAndSortedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredAndSortedProducts.map(product => (
                            <div key={product.id} onClick={() => setSelectedProduct(product)} className="cursor-pointer">
                                <Card item={product} type="product" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-xl text-gray-500">No products found matching your criteria.</p>
                    </div>
                )}
            </div>

            <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        </div>
    );
};

export default StorePage;