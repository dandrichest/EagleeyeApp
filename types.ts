export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
  TRAINER = 'TRAINER',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  specs: Record<string, string>;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  price: number;
  imageUrl: string;
  modules: { title: string; videos: { title: string; length: string }[] }[];
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  tags: string[];
}

export type CartableItem = Product | Course;

export interface CartItem {
  item: CartableItem;
  quantity: number;
}

export interface Order {
    id: string;
    date: string;
    items: CartItem[];
    total: number;
    status: 'Delivered' | 'Processing' | 'Cancelled';
}
