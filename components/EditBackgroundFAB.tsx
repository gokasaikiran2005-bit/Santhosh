import React from 'react';
import { BrushIcon } from './icons/BrushIcon';

interface EditBackgroundFABProps {
    onClick: () => void;
}

const EditBackgroundFAB: React.FC<EditBackgroundFABProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-accent text-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent focus:ring-offset-light-bg dark:focus:ring-offset-dark-bg transform hover:scale-110 hover:rotate-12"
            aria-label="Edit page background"
        >
            <BrushIcon className="w-7 h-7" />
        </button>
    );
};

export default EditBackgroundFAB;