import React, { useState, useEffect, useRef } from 'react';
import type { BannerData } from '../types';
import useIntersectionObserver from './useIntersectionObserver';

interface BannerProps {
    data: BannerData;
}

const Banner: React.FC<BannerProps> = ({ data }) => {
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
        <section
            ref={sectionRef}
            className="relative group bg-light-card dark:bg-dark-card border-y border-light-border dark:border-dark-border overflow-hidden transition-all duration-1000 ease-out"
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
            </div>
        </section>
    );
};

export default Banner;