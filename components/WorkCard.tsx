import React from 'react';
import { Work, AspectRatio } from './RecentWorks';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';
import { EyeIcon } from './icons/EyeIcon';

interface WorkCardProps {
    work: Work;
    companyName?: string;
    isEditMode: boolean;
    onEdit: () => void;
    onDelete: () => void;
    onClick: () => void;
}

const aspectRatioMap: Record<AspectRatio, string> = {
    '16:9': 'aspect-[16/9]',
    '9:16': 'aspect-[9/16]',
    '1:1': 'aspect-square',
    '4:3': 'aspect-[4/3]',
    '21:9': 'aspect-[21/9]',
};

const WorkCard: React.FC<WorkCardProps> = ({ work, companyName, isEditMode, onEdit, onDelete, onClick }) => {

    const handleCardClick = (e: React.MouseEvent) => {
        if (isEditMode || (e.target as HTMLElement).closest('button, a')) return;
        onClick();
    };
    
    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onEdit();
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete();
    };
    
    const handleDetailsClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClick();
    };

    const aspectRatioClass = work.aspectRatio ? aspectRatioMap[work.aspectRatio] : 'aspect-[4/3]';
    
    const interactiveCardClasses = isEditMode 
      ? 'cursor-default' 
      : 'cursor-pointer';

    const formatDate = (dateString?: string) => {
        if (!dateString) return null;
        try {
            // Treat date string as local to prevent timezone-related off-by-one day errors
            const date = new Date(`${dateString}T00:00:00`); 
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
            });
        } catch (e) {
            return null;
        }
    };

    const formattedDate = formatDate(work.date);

    return (
        <div
            className={`group relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-accent/20 ${interactiveCardClasses} ${aspectRatioClass} ${isEditMode ? 'outline-dashed outline-1 outline-accent/50' : ''}`}
            onClick={handleCardClick}
            tabIndex={isEditMode ? -1 : 0}
            onKeyDown={(e) => { if (e.key === 'Enter' && !isEditMode) onClick(); }}
            role={isEditMode ? undefined : 'button'}
            aria-label={isEditMode ? undefined : `View details for ${work.title}`}
        >
            <img
                src={work.images[0]}
                alt={work.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                loading="lazy"
                decoding="async"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-all duration-500 group-hover:bg-gradient-to-t group-hover:from-black/95 group-hover:via-black/70 group-hover:to-transparent"></div>

            {/* Edit/Delete controls */}
            <div className={`absolute top-4 right-4 z-10 flex items-center gap-2 transition-opacity duration-300 ${isEditMode ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 focus-within:opacity-100'}`}>
                <button
                    onClick={handleEditClick}
                    className="p-2 text-gray-300 hover:text-white bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-all transform hover:scale-110"
                    aria-label={`Edit work: ${work.title}`}
                >
                    <EditIcon className="w-5 h-5" />
                </button>
                <button
                    onClick={handleDeleteClick}
                    className="p-2 text-red-400 hover:text-red-300 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-all transform hover:scale-110"
                    aria-label={`Delete work: ${work.title}`}
                >
                    <TrashIcon className="w-5 h-5" />
                </button>
            </div>

            {/* Card Content */}
            <div className="relative h-full p-4 md:p-6 flex flex-col justify-end text-white">
                <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-1 tracking-tight">{work.title}</h3>
                    <div className="flex items-center text-sm text-gray-300 gap-2 mb-2">
                        <span className="font-semibold text-accent">{companyName || 'Personal Project'}</span>
                        {formattedDate && (
                            <>
                                <span className="text-gray-500">&bull;</span>
                                <span>{formattedDate}</span>
                            </>
                        )}
                    </div>
                </div>
                
                {/* Collapsible details revealed on hover */}
                <div className="max-h-0 group-hover:max-h-96 transition-[max-height] duration-500 ease-in-out overflow-hidden">
                    <div className="pt-3 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out delay-100">
                        <div className="flex flex-wrap gap-2 mb-3">
                            {work.tags.map(tag => (
                                <span
                                    key={tag.name}
                                    className="px-2.5 py-1 text-xs font-semibold rounded-full text-white"
                                    style={{ backgroundColor: tag.color, textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}
                                >
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                        <p className="text-sm text-gray-300 mb-3 line-clamp-3 md:line-clamp-4">
                            {work.description}
                        </p>
                        <div className="border-t border-gray-700 pt-3 flex justify-start items-center gap-2">
                             <button
                                onClick={handleDetailsClick}
                                className="inline-flex items-center gap-2 text-white font-bold text-xs py-2 px-3 rounded-full bg-white/10 hover:bg-accent hover:text-white transition-colors"
                                aria-label={`View details for ${work.title}`}
                            >
                                <EyeIcon className="w-4 h-4" />
                                View Details
                            </button>
                            {work.projectUrl && work.projectUrl !== '#' && (
                                <a
                                    href={work.projectUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-flex items-center gap-2 text-white font-bold text-xs py-2 px-3 rounded-full bg-white/10 hover:bg-accent hover:text-white transition-colors"
                                    aria-label={`View external project for ${work.title}`}
                                >
                                    <ExternalLinkIcon className="w-4 h-4" />
                                    View Project
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkCard;