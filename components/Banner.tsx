import React, { useState, useEffect, useRef } from 'react';
import type { BannerData } from '../types';
import { EditIcon } from './icons/EditIcon';
import EditBannerModal from './EditBannerModal';
import useIntersectionObserver from './useIntersectionObserver';

interface BannerProps {
    data: BannerData;
    onDataChange: (newData: BannerData) => void;
    isEditMode: boolean;
}

const Banner: React.FC<BannerProps> = ({ data, onDataChange, isEditMode }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBgMediaLoading, setIsBgMediaLoading] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

    useEffect(() => {
        if ((data.backgroundType === 'image' || data.backgroundType === 'video') && data.backgroundUrl) {
            setIsBgMediaLoading(true);
        } else {
            setIsBgMediaLoading(false);
        }
    }, [data.backgroundType, data.backgroundUrl]);
    
    const handleMediaLoad = () => {
        setIsBgMediaLoading(false);
    };

    return (
        <>
            <section
                ref={sectionRef}
                className={`relative group bg-light-card dark:bg-dark-card border-y border-light-border dark:border-dark-border overflow-hidden transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${isEditMode ? 'outline-dashed outline-2 outline-accent/75' : ''}`}
            >
                {data.backgroundType === 'image' && data.backgroundUrl && (
                    <img 
                        src={data.backgroundUrl} 
                        alt="Banner background" 
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${isBgMediaLoading ? 'opacity-0 scale-110 blur-md' : 'opacity-100 scale-100 blur-0'}`}
                        onLoad={handleMediaLoad}
                        onError={handleMediaLoad}
                    />
                )}
                {data.backgroundType === 'video' && data.backgroundUrl && (
                    <video 
                        key={data.backgroundUrl}
                        src={data.backgroundUrl} 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${isBgMediaLoading ? 'opacity-0 scale-110 blur-md' : 'opacity-100 scale-100 blur-0'}`}
                        onLoadedData={handleMediaLoad}
                        onError={handleMediaLoad}
                    >
                      Your browser does not support the video tag.
                    </video>
                )}
                
                {data.backgroundType !== 'color' && (
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                )}
                
                <div className="relative container mx-auto px-6 md:px-12 py-12 md:py-20 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{data.title}</h2>
                    <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
                        {data.content}
                    </p>
                    <a href={data.buttonLink} className="inline-block px-8 py-4 bg-accent text-white font-bold rounded-full hover:opacity-90 transition-all text-lg transform hover:scale-105">
                        {data.buttonText}
                    </a>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className={`absolute top-6 right-6 p-2 rounded-full text-white bg-black/30 hover:bg-black/50 transition-all transform hover:scale-110 ${isEditMode ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                        aria-label="Edit banner"
                    >
                        <EditIcon className="w-6 h-6" />
                    </button>
                </div>
            </section>
            <EditBannerModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                currentData={data}
                onSave={onDataChange}
            />
        </>
    );
};

export default Banner;