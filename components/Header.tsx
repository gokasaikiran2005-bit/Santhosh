import React, { useState, useRef } from 'react';
import type { Theme, FileData } from '../types';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';
import { GearIcon } from './icons/GearIcon';
import ResumeModal from './ResumeModal';
import { EditIcon } from './icons/EditIcon';
import EditIntroModal from './EditIntroModal';
import { DocumentIcon } from './icons/DocumentIcon';
import { MenuIcon } from './icons/MenuIcon';
import useIntersectionObserver from './useIntersectionObserver';

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  onSettingsClick: () => void;
  resume: FileData | null;
  onResumeChange: (file: File | null) => void;
  name: string;
  title: string;
  onIntroChange: (name: string, title: string) => void;
  isEditMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, toggleSidebar, onSettingsClick, resume, onResumeChange, name, title, onIntroChange, isEditMode }) => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(headerRef, { threshold: 0.1 });

  return (
    <>
      <header ref={headerRef} className="flex justify-between items-center">
        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full text-light-text dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors hidden md:inline-flex"
            aria-label="Toggle sidebar"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
          <div className={`group flex items-center gap-4 p-2 rounded-lg transition-all ${isEditMode ? 'outline-dashed outline-1 outline-accent/50' : ''}`}>
            <div>
              <h1 className={`text-2xl md:text-4xl font-bold text-light-text dark:text-dark-text transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>{name}</h1>
              <p className={`text-md md:text-lg text-gray-500 dark:text-gray-400 transition-all duration-700 ease-out delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>{title}</p>
            </div>
             <button
              onClick={() => setIsIntroModalOpen(true)}
              className={`p-2 rounded-full transition-all transform hover:scale-110 ${isEditMode ? 'opacity-100 text-accent hover:bg-accent/20' : 'opacity-0 group-hover:opacity-100 focus:opacity-100 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              aria-label="Edit intro"
            >
              <EditIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setIsResumeModalOpen(true)}
            className={`inline-flex items-center justify-center gap-2 bg-accent text-white font-bold rounded-full hover:opacity-90 transition-all text-sm transform hover:scale-105 p-2.5 sm:px-4 sm:py-2 duration-700 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${isEditMode ? 'ring-2 ring-accent/50' : ''}`}
            aria-label="View my resume"
          >
            <DocumentIcon className="w-5 h-5" />
            <span className="hidden sm:inline">My Resume</span>
          </button>
          <button
            onClick={onSettingsClick}
            className={`p-2 rounded-full text-light-text dark:text-dark-text bg-light-card dark:bg-dark-card hover:bg-gray-200 dark:hover:bg-gray-700 transition-all transform hover:scale-110 duration-700 ease-out delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            aria-label="Open theme settings"
          >
            <GearIcon className="w-6 h-6" />
          </button>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full text-light-text dark:text-dark-text bg-light-card dark:bg-dark-card hover:bg-gray-200 dark:hover:bg-gray-700 transition-all transform hover:scale-110 duration-700 ease-out delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
          </button>
        </div>
      </header>
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        resume={resume}
        onResumeChange={onResumeChange}
      />
      <EditIntroModal
        isOpen={isIntroModalOpen}
        onClose={() => setIsIntroModalOpen(false)}
        currentName={name}
        currentTitle={title}
        onSave={onIntroChange}
      />
    </>
  );
};

export default Header;