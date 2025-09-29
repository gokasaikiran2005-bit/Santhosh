import React from 'react';
import useActiveSection from './useActiveSection';
import { UserIcon } from './icons/UserIcon';
import { BuildingIcon } from './icons/BuildingIcon';
import { GridIcon } from './icons/GridIcon';
import { WrenchScrewdriverIcon } from './icons/WrenchScrewdriverIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { CloseIcon } from './icons/CloseIcon';

interface NavLink {
    id: string;
    title: string;
    icon: React.ReactElement;
}

const navLinks: NavLink[] = [
    { id: 'about', title: 'About Me', icon: <UserIcon className="w-5 h-5" /> },
    { id: 'company-profiles', title: 'Company Profiles', icon: <BuildingIcon className="w-5 h-5" /> },
    { id: 'recent-works', title: 'Recent Works', icon: <GridIcon className="w-5 h-5" /> },
    { id: 'tools', title: 'Tools I Use', icon: <WrenchScrewdriverIcon className="w-5 h-5" /> },
    { id: 'services', title: 'Services', icon: <SparklesIcon className="w-5 h-5" /> },
];

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const sectionIds = navLinks.map(link => link.id);
    const activeSection = useActiveSection(sectionIds, {
      rootMargin: "-40% 0px -60% 0px",
      threshold: 0,
    });

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        const section = document.getElementById(sectionId);
        if (section) {
            let offset = 0;
            // On mobile, there is a fixed top bar. We need to account for its height.
            if (window.innerWidth < 768) { // md breakpoint
                const topBar = document.querySelector('header.fixed.md\\:hidden') as HTMLElement;
                if (topBar) {
                    // The total offset is the top bar's distance from the top of the viewport plus its height.
                    // This correctly accounts for the draft banner pushing the top bar down.
                    const topBarRect = topBar.getBoundingClientRect();
                    offset = topBarRect.top + topBarRect.height;
                }
            }

            const elementPosition = section.getBoundingClientRect().top;
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            const targetPosition = elementPosition + currentScroll - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }

        if (window.innerWidth < 768) { // md breakpoint
            onClose();
        }
    };

    return (
        <>
            {/* Backdrop for mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-25 md:hidden"
                    onClick={onClose}
                    aria-hidden="true"
                ></div>
            )}
            <aside 
                className={`fixed top-0 left-0 h-screen w-64 bg-light-card/80 dark:bg-dark-card/80 backdrop-blur-lg border-r border-light-border/30 dark:border-dark-border/30 z-30 flex flex-col p-6 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
                aria-label="Main navigation"
            >
                <div className="flex justify-end md:hidden -mr-2">
                     <button 
                        onClick={onClose} 
                        className="p-1" 
                        aria-label="Close sidebar"
                    >
                        <CloseIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>

                <div className="flex flex-col items-center text-center pb-6 mb-6 border-b border-light-border/30 dark:border-dark-border/30">
                    <div className="text-xl font-bold text-light-text dark:text-dark-text mt-4">
                        Santhosh Goka
                    </div>
                </div>
                <nav>
                    <ul className="space-y-2">
                        {navLinks.map(link => (
                            <li key={link.id}>
                                <a 
                                    href={`#${link.id}`}
                                    onClick={(e) => handleLinkClick(e, link.id)}
                                    className={`flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                                        activeSection === link.id 
                                        ? 'bg-accent text-white shadow-md' 
                                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 hover:text-light-text dark:hover:text-dark-text'
                                    }`}
                                    aria-current={activeSection === link.id ? 'page' : undefined}
                                >
                                    {link.icon}
                                    <span>{link.title}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;