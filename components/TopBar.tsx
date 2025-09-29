import React from 'react';
import { MenuIcon } from './icons/MenuIcon';

interface TopBarProps {
    onMenuClick: () => void;
    hasDraft: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ onMenuClick, hasDraft }) => {
    return (
        <header className={`fixed left-0 right-0 z-20 md:hidden bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-md h-16 flex items-center px-4 border-b border-light-border/30 dark:border-dark-border/30 transition-all duration-300 ${hasDraft ? 'top-12' : 'top-0'}`}>
            <button
                onClick={onMenuClick}
                className="p-2 rounded-full text-light-text dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Open sidebar"
            >
                <MenuIcon className="w-6 h-6" />
            </button>
            <div className="flex-grow text-center">
                <span className="text-lg font-bold text-light-text dark:text-dark-text">Santhosh Goka</span>
            </div>
            <div className="w-10"></div> {/* Spacer to balance the button */}
        </header>
    );
};

export default TopBar;