import React, { useState, useEffect } from 'react';
import Modal from './Modal';

interface EditToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTools: string[];
  onSave: (newTools: string[]) => void;
}

const EditToolsModal: React.FC<EditToolsModalProps> = ({ isOpen, onClose, currentTools, onSave }) => {
  const [toolsText, setToolsText] = useState('');

  useEffect(() => {
    if (isOpen) {
      setToolsText(currentTools.join('\n'));
    }
  }, [isOpen, currentTools]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTools = toolsText.split('\n').map(s => s.trim()).filter(Boolean);
    onSave(newTools);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">
        Edit Tools
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="tools-list" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Tools (one per line)
          </label>
          <textarea
            id="tools-list"
            value={toolsText}
            onChange={(e) => setToolsText(e.target.value)}
            required
            rows={8}
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

export default EditToolsModal;