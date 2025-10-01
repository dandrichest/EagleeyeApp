import React from 'react';
import { Product, Course, BlogPost } from '../../types.js';
import { formatCurrency } from '../../constants.js';

type Item = Product | Course | BlogPost;

interface CardProps {
    item: Item;
    type: 'product' | 'course' | 'blog';
}

const Card: React.FC<CardProps> = ({ item, type }) => {
    let title: string, description: string, imageUrl: string, footer: React.ReactNode;

    if (type === 'product' || type === 'course') {
        const productOrCourse = item as Product | Course;
        title = 'name' in productOrCourse ? productOrCourse.name : productOrCourse.title;
        description = productOrCourse.description;
        imageUrl = productOrCourse.imageUrl;
        footer = <div className="text-xl font-bold text-orange-500">{formatCurrency(productOrCourse.price)}</div>;
    } else { // blog
        const blogPost = item as BlogPost;
        title = blogPost.title;
        description = blogPost.excerpt;
        imageUrl = blogPost.imageUrl;
        footer = <div className="text-sm text-gray-500 dark:text-gray-400">By {blogPost.author}</div>;
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full flex flex-col group transform hover:-translate-y-1 transition-transform duration-300">
            <div className="relative">
                <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 truncate">{title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow">{description}</p>
            </div>
             <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
                {footer}
                <span className="text-sm font-semibold text-orange-500 group-hover:text-orange-600">View Details &rarr;</span>
            </div>
        </div>
    );
};

export default Card;