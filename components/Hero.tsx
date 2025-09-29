import React, { useState, useRef } from 'react';
import type { HeroData } from '../types';
import { EditIcon } from './icons/EditIcon';
import EditHeroModal from './EditHeroModal';
import useIntersectionObserver from './useIntersectionObserver';

interface HeroProps {
    data: HeroData;
    onDataChange: (newData: HeroData) => void;
    isEditMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ data, onDataChange, isEditMode }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

    return (
        <>
            <section
                ref={sectionRef}
                id="hero"
                className={`relative group bg-light-card dark:bg-dark-card border-b border-light-border dark:border-dark-border transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
                <div className="relative container mx-auto px-6 md:px-12 py-24 md:py-40 text-center">
                    <p className="text-lg font-semibold text-accent mb-2 uppercase tracking-widest">Creative Vision</p>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-light-text dark:text-dark-text">{data.title}</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                        {data.content}
                    </p>
                    <a href={data.buttonLink} className="inline-block px-8 py-4 bg-accent text-white font-bold rounded-full hover:bg-red-700 transition-all text-lg transform hover:scale-105">
                        {data.buttonText}
                    </a>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className={`absolute top-6 right-6 p-2 rounded-full text-light-text dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-700 transition-all transform hover:scale-110 ${isEditMode ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                        aria-label="Edit hero"
                    >
                        <EditIcon className="w-6 h-6" />
                    </button>
                </div>
            </section>
            <EditHeroModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                currentData={data}
                onSave={onDataChange}
            />
        </>
    );
};

export default Hero;