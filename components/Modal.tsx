import React, { ReactNode } from 'react';
import { CloseIcon } from './icons/CloseIcon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-light-card/70 dark:bg-dark-card/70 backdrop-blur-lg border border-light-border/30 dark:border-dark-border/30 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative transition-colors duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all transform hover:scale-110"
          aria-label="Close modal"
        >
          <CloseIcon className="w-6 h-6" />
        </button>
        <div className="p-8 md:p-12">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;