import React, { useState, useRef } from 'react';
import { EditIcon } from './icons/EditIcon';
import EditSectionTitleModal from './EditSectionTitleModal';
import EditServicesModal from './EditServicesModal';
import useIntersectionObserver from './useIntersectionObserver';

interface ServicesProps {
  title: string;
  onTitleChange: (newTitle: string) => void;
  services: string[];
  onServicesChange: (newServices: string[]) => void;
  isEditMode: boolean;
}

const Services: React.FC<ServicesProps> = ({ title, onTitleChange, services, onServicesChange, isEditMode }) => {
  const [isTitleModalOpen, setIsTitleModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <>
      <section 
        ref={sectionRef}
        className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className={`group flex items-center justify-center gap-4 mb-10 rounded-lg ${isEditMode ? 'outline-dashed outline-1 outline-accent/50 p-2' : ''}`}>
          <h2 className="text-3xl font-bold text-light-text dark:text-dark-text">{title}</h2>
          <button
            onClick={() => setIsTitleModalOpen(true)}
            className={`p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-all focus:opacity-100 ${isEditMode ? '!opacity-100' : ''} transform hover:scale-110`}
            aria-label="Edit section title"
          >
            <EditIcon className="w-5 h-5" />
          </button>
        </div>
        <div className={`flex flex-wrap justify-center gap-3 md:gap-4 rounded-lg ${isEditMode ? 'outline-dashed outline-1 outline-accent/50 p-4' : ''}`}>
          {services.map((service) => (
            <span
              key={service}
              className="px-5 py-2 bg-light-card/60 dark:bg-dark-card/60 backdrop-blur-sm text-light-text dark:text-dark-text rounded-full border border-light-border/30 dark:border-dark-border/30 text-sm md:text-base font-medium transition-colors duration-300"
            >
              {service}
            </span>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
            <button 
                onClick={() => setIsEditModalOpen(true)}
                className="px-4 py-2 bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text border border-light-border dark:border-dark-border rounded-full font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-sm flex items-center gap-2 transform hover:scale-105"
                aria-label="Edit services list"
            >
                <EditIcon className="w-4 h-4" />
                Edit List
            </button>
        </div>
      </section>
      <EditSectionTitleModal
        isOpen={isTitleModalOpen}
        onClose={() => setIsTitleModalOpen(false)}
        currentTitle={title}
        onSave={onTitleChange}
        modalTitle="Edit Section Title"
      />
      <EditServicesModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentServices={services}
        onSave={onServicesChange}
      />
    </>
  );
};

export default Services;