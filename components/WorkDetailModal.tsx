import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { Work } from './RecentWorks';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';

interface WorkDetailModalProps {
    work: Work | null;
    onClose: () => void;
    companyName?: string;
}

const WorkDetailModal: React.FC<WorkDetailModalProps> = ({ work, onClose, companyName }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (work) {
            setCurrentImageIndex(0);
        }
    }, [work]);

    if (!work) return null;

    const hasMultipleImages = work.images.length > 1;

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % work.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + work.images.length) % work.images.length);
    };

    return (
        <Modal isOpen={!!work} onClose={onClose}>
            <div className="space-y-6">
                <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-light-bg dark:bg-dark-bg">
                    <img 
                        src={work.images[currentImageIndex]} 
                        alt={`${work.title} - view ${currentImageIndex + 1}`}
                        className="w-full h-full object-contain"
                    />
                    {hasMultipleImages && (
                        <>
                            <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 text-white rounded-full hover:bg-black/60 transition-colors" aria-label="Previous image">
                                <ChevronLeftIcon className="w-6 h-6" />
                            </button>
                            <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 text-white rounded-full hover:bg-black/60 transition-colors" aria-label="Next image">
                                <ChevronRightIcon className="w-6 h-6" />
                            </button>
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                                {work.images.map((_, index) => (
                                    <button 
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex ? 'bg-white' : 'bg-white/50 hover:bg-white'}`}
                                        aria-label={`Go to image ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
                
                <div>
                    <h3 className="text-3xl font-bold text-light-text dark:text-dark-text">{work.title}</h3>
                    {companyName && (
                        <p className="text-md text-gray-500 dark:text-gray-400 mt-1">
                            For <span className="font-semibold text-accent">{companyName}</span>
                            {work.companyProfileId && <span className="text-light-text/70 dark:text-dark-text/70 ml-2">(ID: {work.companyProfileId})</span>}
                        </p>
                    )}
                    {work.aspectRatio && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Aspect Ratio: <span className="font-semibold text-light-text dark:text-dark-text">{work.aspectRatio}</span>
                        </p>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {work.tags.map(tag => (
                        <span key={tag.name} className="px-3 py-1 text-sm text-white rounded-full" style={{ backgroundColor: tag.color }}>
                            {tag.name}
                        </span>
                    ))}
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {work.description}
                </p>

                {work.videoUrls && work.videoUrls.length > 0 && (
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-light-text dark:text-dark-text border-b border-light-border dark:border-dark-border pb-2">Videos</h4>
                        {work.videoUrls.map((url, index) => (
                            <div key={index} className="aspect-video">
                                <video src={url} controls className="w-full h-full rounded-lg" />
                            </div>
                        ))}
                    </div>
                )}
                
                {work.projectUrl && work.projectUrl !== '#' && (
                     <div className="pt-4">
                        <a
                            href={work.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-accent text-white font-bold rounded-full hover:opacity-90 transition-all transform hover:scale-105"
                        >
                            View Project <ExternalLinkIcon className="w-5 h-5" />
                        </a>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default WorkDetailModal;