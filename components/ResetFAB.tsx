import React from 'react';
import { RefreshIcon } from './icons/RefreshIcon';

interface ResetFABProps {
    onClick: () => void;
}

const ResetFAB: React.FC<ResetFABProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-56 right-6 z-40 w-14 h-14 bg-yellow-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-yellow-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 focus:ring-offset-light-bg dark:focus:ring-offset-dark-bg transform hover:scale-110"
            aria-label="Reset portfolio to default"
        >
            <RefreshIcon className="w-7 h-7" />
        </button>
    );
};

export default ResetFAB;