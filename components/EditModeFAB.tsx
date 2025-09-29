import React from 'react';
import { EditIcon } from './icons/EditIcon';
import { CloseIcon } from './icons/CloseIcon';

interface EditModeFABProps {
    onClick: () => void;
    isEditMode: boolean;
}

const EditModeFAB: React.FC<EditModeFABProps> = ({ onClick, isEditMode }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-accent text-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent focus:ring-offset-light-bg dark:focus:ring-offset-dark-bg transform hover:scale-110 hover:rotate-12"
            aria-label={isEditMode ? 'Exit edit mode' : 'Enter edit mode'}
        >
            {isEditMode ? <CloseIcon className="w-7 h-7" /> : <EditIcon className="w-7 h-7" />}
        </button>
    );
};

export default EditModeFAB;