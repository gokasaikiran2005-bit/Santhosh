import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { TrashIcon } from './icons/TrashIcon';
import type { Tag } from './RecentWorks';

interface EditTagsModalProps {
  isOpen: boolean;
  onClose: () => void;
  allTags: Tag[];
  onSave: (tagChanges: Record<string, Tag | null>) => void;
}

const EditTagsModal: React.FC<EditTagsModalProps> = ({ isOpen, onClose, allTags, onSave }) => {
  const [editedTags, setEditedTags] = useState<Record<string, Tag | null>>({});

  useEffect(() => {
    if (isOpen) {
      const initial: Record<string, Tag> = {};
      allTags.forEach(tag => {
        initial[tag.name] = { ...tag };
      });
      setEditedTags(initial);
    }
  }, [isOpen, allTags]);

  const handleTagChange = (originalName: string, field: 'name' | 'color', value: string) => {
    setEditedTags(prev => {
        const currentTag = prev[originalName];
        if (!currentTag) return prev;
        return {
            ...prev,
            [originalName]: { ...currentTag, [field]: value }
        };
    });
  };
  
  const handleDeleteTag = (originalName: string) => {
    setEditedTags(prev => ({ ...prev, [originalName]: null }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const changes: Record<string, Tag | null> = {};

    allTags.forEach(originalTag => {
      const editedVersion = editedTags[originalTag.name];
      
      if (editedVersion === null) {
        changes[originalTag.name] = null;
        return;
      }
      
      if (editedVersion && (editedVersion.name !== originalTag.name || editedVersion.color !== originalTag.color)) {
        changes[originalTag.name] = editedVersion;
      }
    });

    if (Object.keys(changes).length > 0) {
      onSave(changes);
    }
    
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">
        Edit Filter Tags
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Renaming, recoloring, or deleting a tag here will update it across all projects. This change cannot be undone.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {allTags.map(tag => (
             editedTags[tag.name] && (
                <div key={tag.name} className="flex items-center gap-3">
                  <input
                    type="color"
                    value={editedTags[tag.name]?.color || '#FFFFFF'}
                    onChange={(e) => handleTagChange(tag.name, 'color', e.target.value)}
                    className="p-1 h-10 w-10 block bg-transparent border border-light-border dark:border-dark-border rounded-lg cursor-pointer"
                    title="Select tag color"
                  />
                  <input
                    type="text"
                    value={editedTags[tag.name]?.name || ''}
                    onChange={(e) => handleTagChange(tag.name, 'name', e.target.value)}
                    className="flex-grow w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text focus:ring-accent focus:border-accent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteTag(tag.name)}
                    className="p-3 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-full transition-all transform hover:scale-110"
                    aria-label={`Delete tag ${tag.name}`}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
             )
          ))}
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

export default EditTagsModal;