import React, { ChangeEvent, useRef, useState, useEffect } from 'react';
import Modal from './Modal';
import type { FileData } from '../types';
import { UploadIcon } from './icons/UploadIcon';
import { TrashIcon } from './icons/TrashIcon';

interface ProfilePicModalProps {
  isOpen: boolean;
  onClose: () => void;
  profilePic: FileData | null;
  onProfilePicChange: (file: File | null) => void;
}

const ProfilePicModal: React.FC<ProfilePicModalProps> = ({ isOpen, onClose, profilePic, onProfilePicChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editedPicUrl, setEditedPicUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  // Initialize and clean up state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setEditedPicUrl(profilePic?.url || null);
      setSelectedFile(null); // Reset file on open
    }
    
    // Cleanup function for when the component unmounts or isOpen changes
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, [isOpen, profilePic]);


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const MAX_SIZE_MB = 5;
      const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
      const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

      if (!ALLOWED_TYPES.includes(file.type)) {
        alert(`Unsupported file type. Please upload a JPG, PNG, GIF, or WEBP image.`);
        e.target.value = '';
        return;
      }
      if (file.size > MAX_SIZE_BYTES) {
        alert(`Profile picture is too large. Maximum size is ${MAX_SIZE_MB}MB.`);
        e.target.value = '';
        return;
      }

      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
      const newUrl = URL.createObjectURL(file);
      objectUrlRef.current = newUrl;
      setEditedPicUrl(newUrl);
      setSelectedFile(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleRemoveClick = () => {
    if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
    }
    setEditedPicUrl(null);
    setSelectedFile(null);
  };

  const handleSave = () => {
    const originalPicExisted = !!profilePic;
    const currentPicExists = !!editedPicUrl;

    if (selectedFile) { // New file uploaded
      onProfilePicChange(selectedFile);
    } else if (originalPicExisted && !currentPicExists) { // Picture removed
      onProfilePicChange(null);
    }
    // Otherwise, no changes to save.
    onClose();
  };


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6 text-center">Profile Picture</h3>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/gif, image/webp"
        />
        <div className="flex flex-col items-center gap-6">
          {editedPicUrl ? (
            <img 
              src={editedPicUrl} 
              alt="Profile picture preview"
              className="w-48 h-48 rounded-full object-cover border-4 border-accent"
            />
          ) : (
            <div 
              className="w-48 h-48 rounded-full bg-light-bg dark:bg-dark-bg flex items-center justify-center border-2 border-dashed border-light-border dark:border-dark-border cursor-pointer hover:border-accent dark:hover:border-accent transition-colors"
              onClick={handleUploadClick}
              role="button"
              aria-label="Upload profile picture"
            >
              <UploadIcon className="w-16 h-16 text-gray-400" />
            </div>
          )}
            
          <div className="flex items-center justify-center gap-4">
            {editedPicUrl ? (
              <>
                <button
                  onClick={handleUploadClick}
                  className="px-6 py-2 rounded-full border border-light-border dark:border-dark-border text-light-text dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-700 transition-all font-semibold transform hover:scale-105"
                >
                  Replace
                </button>
                <button
                  onClick={handleRemoveClick}
                  className="p-3 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all transform hover:scale-110"
                  aria-label="Remove profile picture"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </>
            ) : (
              <button
                onClick={handleUploadClick}
                className="px-6 py-3 bg-accent text-white font-bold rounded-full hover:opacity-90 transition-all transform hover:scale-105"
              >
                Upload Picture
              </button>
            )}
          </div>
        </div>
         <div className="pt-8 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2 bg-accent text-white font-bold rounded-full hover:opacity-90 transition-all transform hover:scale-105"
          >
            Done
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ProfilePicModal;