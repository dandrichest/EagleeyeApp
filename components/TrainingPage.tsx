import React, { useState } from 'react';
import { Course } from '../types';
import { COURSES, formatCurrency } from '../constants';
import Card from './common/Card';
import Modal from './common/Modal';
import { useCart } from '../App';

const CourseDetailModal: React.FC<{ course: Course | null; onClose: () => void }> = ({ course, onClose }) => {
    const { addToCart } = useCart();
    const [enrolled, setEnrolled] = useState(false);

    if (!course) return null;

    const handleEnroll = () => {
        addToCart(course);
        setEnrolled(true);
        setTimeout(() => setEnrolled(false), 2000);
    };

    return (
        <Modal isOpen={!!course} onClose={onClose} title={course.title}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <img src={course.imageUrl} alt={course.title} className="w-full h-auto object-cover rounded-lg" />
                <div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{course.description}</p>
                    <div className="text-3xl font-bold text-orange-500 mb-4">{formatCurrency(course.price)}</div>
                    <div className="mb-4 space-y-2 text-gray-700 dark:text-gray-200">
                        <p><strong>Instructor:</strong> {course.instructor}</p>
                        <p><strong>Duration:</strong> {course.duration}</p>
                    </div>
                    <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-100">Course Modules</h4>
                     <ul className="list-decimal list-inside text-gray-600 dark:text-gray-400 space-y-1">
                        {course.modules.map((module) => (
                            <li key={module.title}>{module.title}</li>
                        ))}
                    </ul>
                     <button
                        onClick={handleEnroll}
                        className={`mt-6 w-full text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md ${enrolled ? 'bg-green-500' : 'bg-orange-500 hover:bg-orange-600'}`}
                        disabled={enrolled}
                    >
                        {enrolled ? 'Added to Cart!' : 'Enroll Now'}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

const TrainingPage = () => {
    const [courses] = useState<Course[]>(COURSES);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    return (
         <div className="bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Training Portal</h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Advance your skills with our expert-led courses.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map(course => (
                         <div key={course.id} onClick={() => setSelectedCourse(course)} className="cursor-pointer">
                            <Card item={course} type="course" />
                        </div>
                    ))}
                </div>
            </div>
            <CourseDetailModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
        </div>
    );
};

export default TrainingPage;
