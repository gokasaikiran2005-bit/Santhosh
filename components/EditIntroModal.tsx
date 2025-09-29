import React, { useState, useEffect } from 'react';
import Modal from './Modal';

interface EditIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  currentTitle: string;
  onSave: (newName: string, newTitle: string) => void;
}

const EditIntroModal: React.FC<EditIntroModalProps> = ({ isOpen, onClose, currentName, currentTitle, onSave }) => {
  const [name, setName] = useState(currentName);
  const [title, setTitle] = useState(currentTitle);

  useEffect(() => {
    if (isOpen) {
      setName(currentName);
      setTitle(currentTitle);
    }
  }, [isOpen, currentName, currentTitle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(name, title);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">
        Edit Intro
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text focus:ring-accent focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Title / Role
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text focus:ring-accent focus:border-accent"
          />
        </div>
        <div className="pt-4 flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-full font-semibold text-light-text dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-700 transition-all transform hover:scale-105"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-accent text-white font-bold rounded-full hover:opacity-90 transition-all transform hover:scale-105"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditIntroModal;