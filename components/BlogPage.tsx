import React, { useState } from 'react';
import { BlogPost } from '../types.ts';
import { BLOG_POSTS } from '../constants.tsx';
import Card from './common/Card.tsx';
import Modal from './common/Modal.tsx';

const BlogPostModal: React.FC<{ post: BlogPost | null; onClose: () => void }> = ({ post, onClose }) => {
    if (!post) return null;

    return (
        <Modal isOpen={!!post} onClose={onClose} title={post.title}>
            <div className="prose dark:prose-invert max-w-none">
                <img src={post.imageUrl} alt={post.title} className="w-full h-auto object-cover rounded-lg mb-4" />
                <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span>By {post.author}</span>
                    <span className="mx-2">&bull;</span>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <p>{post.content}</p> {/* Replace with full content if available */}
                <p>This is where the full, rich text of the blog post would be rendered. For this demo, we are showing the excerpt again.</p>
                <p>{post.excerpt}</p>
                <div className="mt-6">
                    {post.tags.map(tag => (
                        <span key={tag} className="inline-block bg-orange-100 text-orange-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </Modal>
    );
};

const BlogPage = () => {
    const [posts] = useState<BlogPost[]>(BLOG_POSTS);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Our Blog</h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">News, updates, and insights on security and solar.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map(post => (
                        <div key={post.id} onClick={() => setSelectedPost(post)} className="cursor-pointer">
                            <Card item={post} type="blog" />
                        </div>
                    ))}
                </div>
            </div>
            <BlogPostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
        </div>
    );
};

export default BlogPage;