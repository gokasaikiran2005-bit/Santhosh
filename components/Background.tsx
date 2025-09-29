import React, { useState, useEffect } from 'react';
import type { PageBackground } from '../types';

interface BackgroundProps {
    background: PageBackground;
}

const Background: React.FC<BackgroundProps> = ({ background }) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if ((background.type === 'image' || background.type === 'video') && background.value) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [background.type, background.value]);

    const handleMediaLoad = () => {
        setIsLoading(false);
    };

    if (background.type === 'color') {
        return null; // Color is handled on the body tag directly in App.tsx
    }

    return (
        <div className="fixed inset-0 w-full h-full z-[-10] bg-light-bg dark:bg-dark-bg transition-colors duration-300">
            {background.type === 'image' && background.value && (
                <img
                    src={background.value}
                    alt="Page background"
                    className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${isLoading ? 'opacity-0 scale-110 blur-md' : 'opacity-100 scale-100 blur-0'}`}
                    onLoad={handleMediaLoad}
                    onError={handleMediaLoad}
                />
            )}
            {background.type === 'video' && background.value && (
                <video
                    key={background.value}
                    src={background.value}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${isLoading ? 'opacity-0 scale-110 blur-md' : 'opacity-100 scale-100 blur-0'}`}
                    onLoadedData={handleMediaLoad}
                    onError={handleMediaLoad}
                >
                    Your browser does not support the video tag.
                </video>
            )}
        </div>
    );
};

export default Background;