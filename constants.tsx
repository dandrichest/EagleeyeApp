import React from 'react';
import { Product, Course, BlogPost, User, UserRole, Order } from './types.js';

// --- UTILITY ---
export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
    }).format(amount);
};


// --- DATA ---
export const USERS: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@eagleeyes.com', role: UserRole.ADMIN, password: 'adminpassword' },
  { id: '2', name: 'Jane Doe', email: 'jane@example.com', role: UserRole.CUSTOMER, password: 'userpassword' },
  { id: '3', name: 'John Trainer', email: 'trainer@eagleeyes.com', role: UserRole.TRAINER, password: 'trainerpassword' },
];

export const PRODUCTS: Product[] = [
    {
        id: 'p1',
        name: '4K Ultra HD CCTV Camera',
        category: 'Security',
        description: 'Weatherproof 4K Ultra HD security camera with night vision and motion detection.',
        price: 300000,
        imageUrl: 'https://images.pexels.com/photos/7161073/pexels-photo-7161073.jpeg',
        stock: 50,
        specs: { 'Resolution': '4K Ultra HD', 'Field of View': '120°', 'Night Vision': '100ft' }
    },
    {
        id: 'p2',
        name: '5kW Solar Panel System',
        category: 'Solar Energy',
        description: 'Complete 5kW monocrystalline solar panel kit for residential use. Includes panels, inverter, and mounting hardware.',
        price: 6750000,
        imageUrl: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg',
        stock: 15,
        specs: { 'Power Output': '5000W', 'Panel Type': 'Monocrystalline', 'Warranty': '25 years' }
    },
    {
        id: 'p3',
        name: 'Smart Video Doorbell',
        category: 'Security',
        description: 'See, hear, and speak to anyone at your door from your phone, tablet, or PC.',
        price: 195000,
        imageUrl: 'https://images.pexels.com/photos/6966113/pexels-photo-6966113.jpeg',
        stock: 75,
        specs: { 'Video': '1080p HD', 'Two-way Audio': 'Yes', 'Power': 'Battery or Hardwired' }
    },
    {
        id: 'p4',
        name: 'Electric Fence Energizer',
        category: 'Security',
        description: 'High-voltage energizer for electric security fences. Covers up to 10km.',
        price: 525000,
        imageUrl: 'https://images.pexels.com/photos/997275/pexels-photo-997275.jpeg',
        stock: 30,
        specs: { 'Output Voltage': '10,000V', 'Range': '10km', 'Power Source': 'AC/DC' }
    },
    {
        id: 'p5',
        name: '10kWh Solar Battery',
        category: 'Solar Energy',
        description: 'Lithium-ion battery for storing solar energy. Provides backup power during outages.',
        price: 12000000,
        imageUrl: 'https://images.pexels.com/photos/5799863/pexels-photo-5799863.jpeg',
        stock: 10,
        specs: { 'Capacity': '10 kWh', 'Chemistry': 'LiFePO4', 'Lifespan': '10+ years' }
    },
    {
        id: 'p6',
        name: 'Professional Walkie Talkie Set',
        category: 'General Security',
        description: 'A set of two durable, long-range walkie talkies for professional security teams.',
        price: 375000,
        imageUrl: 'https://images.pexels.com/photos/1647919/pexels-photo-1647919.jpeg',
        stock: 40,
        specs: { 'Range': 'Up to 5 miles', 'Channels': '22', 'Battery': 'Rechargeable Li-ion' }
    },
];

export const COURSES: Course[] = [
    {
        id: 'c1',
        title: 'CCTV Installation Fundamentals',
        description: 'Learn the basics of CCTV systems, from camera types to wiring and NVR setup.',
        instructor: 'John Trainer',
        duration: '6 Weeks',
        price: 450000,
        imageUrl: 'https://images.pexels.com/photos/8452417/pexels-photo-8452417.jpeg',
        modules: [{ title: 'Intro', videos: [] }, { title: 'Installation', videos: [] }]
    },
    {
        id: 'c2',
        title: 'Advanced Solar Panel Sizing',
        description: 'A deep dive into calculating energy needs and designing efficient solar power systems.',
        instructor: 'Admin User',
        duration: '8 Weeks',
        price: 750000,
        imageUrl: 'https://images.pexels.com/photos/3862622/pexels-photo-3862622.jpeg',
        modules: [{ title: 'Basics', videos: [] }, { title: 'Advanced Sizing', videos: [] }]
    },
    {
        id: 'c3',
        title: 'Physical Security Best Practices',
        description: 'Covering risk assessment, access control, and perimeter defense strategies.',
        instructor: 'John Trainer',
        duration: '4 Weeks',
        price: 300000,
        imageUrl: 'https://images.pexels.com/photos/8532431/pexels-photo-8532431.jpeg',
        modules: [{ title: 'Intro to Security', videos: [] }, { title: 'Perimeter Defense', videos: [] }]
    },
];

export const BLOG_POSTS: BlogPost[] = [
    {
        id: 'b1',
        title: 'The Future of Home Security is Smart',
        author: 'Admin User',
        date: '2023-10-26',
        excerpt: 'Smart home technology is revolutionizing the way we protect our homes. From AI-powered cameras to integrated systems...',
        content: 'Full content goes here.',
        imageUrl: 'https://images.pexels.com/photos/3951901/pexels-photo-3951901.jpeg',
        tags: ['Security', 'Smart Home']
    },
    {
        id: 'b2',
        title: 'Is Going Solar Right For You? A Complete Guide',
        author: 'Jane Doe',
        date: '2023-10-20',
        excerpt: 'With rising energy costs, many are considering solar power. This guide breaks down the costs, benefits, and considerations...',
        content: 'Full content goes here.',
        imageUrl: 'https://images.pexels.com/photos/4148019/pexels-photo-4148019.jpeg',
        tags: ['Solar', 'Energy', 'Finance']
    },
];

export const ORDER_HISTORY: Order[] = [
    {
        id: 'order1',
        date: '2023-10-15',
        total: 300000,
        status: 'Delivered',
        items: [{ item: PRODUCTS[0], quantity: 1 }],
    },
    {
        id: 'order2',
        date: '2023-09-01',
        total: 750000,
        status: 'Delivered',
        items: [{ item: COURSES[1], quantity: 1 }],
    },
];


// --- ICONS ---
export const LogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <radialGradient id="pupilGradient" cx="50%" cy="50%" r="50%" fx="60%" fy="40%">
                <stop offset="0%" stopColor="#FFD180" />
                <stop offset="50%" stopColor="#FF9100" />
                <stop offset="100%" stopColor="#F57C00" />
            </radialGradient>
        </defs>
        <path d="M192.8,41.42c-2.4-25-33.8-44.5-70.5-40.8C65.5,5.12,23.3,47.32,25.7,72.32" fill="#1C3F94" stroke="#1C3F94" strokeWidth="1" />
        <path d="M12.9,46.22c23.5-16.1,59-19,89.2-8.5c24.3,8.4,42.2,32.3,49.2,56.7" fill="none" stroke="#F57C00" strokeWidth="10" strokeMiterlimit="10"/>
        <path d="M149,43.72a39.5,39.5,0,1,1-67.5-27.1,39.5,39.5,0,0,1,67.5,27.1Z" fill="#1C3F94"/>
        <circle cx="115.5" cy="36.22" r="16" fill="url(#pupilGradient)" />
        <path d="M115.5,36.22a24.5,24.5,0,1,1-42-16.7,24.5,24.5,0,0,1,42,16.7Z" fill="#1C3F94" />
        <path d="M174.3,48.22c-20.2-35.8-73.4-48-120-27.8C7.7,40.62-10.1,84.42,10.1,119.22" fill="none" />
    </svg>
);


export const SunIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
);

export const ShieldCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
    </svg>
);

export const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

export const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const UserCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const ShoppingCartIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l1.823-6.831a.75.75 0 00-.67-1.03H5.625a.75.75 0 00-.749.646L4.875 8.25M7.5 14.25h11.218M15 18a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-7.5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
);

export const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.124-2.033-2.124H8.033c-1.12 0-2.033.944-2.033 2.124v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);

export const PencilIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
);