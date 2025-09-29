
import React from 'react';

interface RestoreDraftBannerProps {
  isOpen: boolean;
  onRestore: () => void;
  onDismiss: () => void;
}

const RestoreDraftBanner: React.FC<RestoreDraftBannerProps> = ({ isOpen, onRestore, onDismiss }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div 
        className="fixed top-0 left-0 right-0 bg-yellow-400 dark:bg-yellow-500 text-black dark:text-white p-3 z-50 flex items-center justify-center gap-4 shadow-lg"
        role="alert"
    >
      <p className="text-sm font-semibold text-center">You have an unsaved draft. Would you like to restore it?</p>
      <div className="flex gap-2 flex-shrink-0">
        <button
          onClick={onRestore}
          className="px-4 py-1.5 bg-green-500 text-white rounded-md text-sm font-bold hover:bg-green-600 transition-colors"
        >
          Restore
        </button>
        <button
          onClick={onDismiss}
          className="px-4 py-1.5 bg-gray-600/20 dark:bg-black/20 rounded-md text-sm font-semibold hover:bg-gray-600/40 dark:hover:bg-black/40 transition-colors"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default RestoreDraftBanner;
