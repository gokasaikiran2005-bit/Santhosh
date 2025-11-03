import React, { useRef } from 'react';
import type { Theme, FileData } from '../types';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';
import { DocumentIcon } from './icons/DocumentIcon';
import { MenuIcon } from './icons/MenuIcon';
import useIntersectionObserver from './useIntersectionObserver';

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  resume: FileData | null;
  name: string;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, toggleSidebar, resume, name, title }) => {
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
          <div className="group flex items-center gap-4 p-2 rounded-lg transition-all">
            <div>
              <h1 className={`text-2xl md:text-4xl font-bold text-light-text dark:text-dark-text transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>{name}</h1>
              <p className={`text-md md:text-lg text-gray-500 dark:text-gray-400 transition-all duration-700 ease-out delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>{title}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {resume && (
            <a
              href={resume.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 bg-accent text-white font-bold rounded-full hover:opacity-90 transition-all text-sm transform hover:scale-105 p-2.5 sm:px-4 sm:py-2 duration-700 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              aria-label="View my resume"
            >
              <DocumentIcon className="w-5 h-5" />
              <span className="hidden sm:inline">My Resume</span>
            </a>
          )}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full text-light-text dark:text-dark-text bg-light-card dark:bg-dark-card hover:bg-gray-200 dark:hover:bg-gray-700 transition-all transform hover:scale-110 duration-700 ease-out delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;