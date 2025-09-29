import React from 'react';
import { SaveIcon } from './icons/SaveIcon';

const Spinner: React.FC = () => (
  <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-white"></div>
);

interface SaveFABProps {
    onClick: () => void;
    isSaving: boolean;
}

const SaveFAB: React.FC<SaveFABProps> = ({ onClick, isSaving }) => {
    return (
        <button
            onClick={onClick}
            disabled={isSaving}
            className="fixed bottom-40 right-6 z-40 w-14 h-14 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:ring-offset-light-bg dark:focus:ring-offset-dark-bg transform hover:scale-110 disabled:bg-green-400 disabled:cursor-not-allowed"
            aria-label="Save changes"
        >
            {isSaving ? <Spinner /> : <SaveIcon className="w-7 h-7" />}
        </button>
    );
};

export default SaveFAB;