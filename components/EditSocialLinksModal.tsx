import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { SocialLink, IconName } from '../types';
import { TrashIcon } from './icons/TrashIcon';

interface EditSocialLinksModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLinks: SocialLink[];
  onSave: (newLinks: SocialLink[]) => void;
}

const availableIcons: IconName[] = ['X', 'LinkedIn', 'Gmail', 'Phone', 'Location'];

const EditSocialLinksModal: React.FC<EditSocialLinksModalProps> = ({ isOpen, onClose, currentLinks, onSave }) => {
  const [links, setLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Create a deep copy to avoid mutating the original state directly
      setLinks(JSON.parse(JSON.stringify(currentLinks)));
    }
  }, [isOpen, currentLinks]);

  const handleLinkChange = (index: number, field: keyof SocialLink, value: string) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setLinks(newLinks);
  };

  const handleAddLink = () => {
    setLinks([...links, { icon: 'X', label: 'New Link', href: '#' }]);
  };

  const handleRemoveLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(links);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">
        Edit Social Links
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {links.map((link, index) => (
            <div key={index} className="p-4 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Icon</label>
                  <select
                    value={link.icon}
                    onChange={(e) => handleLinkChange(index, 'icon', e.target.value)}
                    className="w-full px-3 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text focus:ring-accent focus:border-accent"
                  >
                    {availableIcons.map(iconName => (
                      <option key={iconName} value={iconName}>{iconName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Label</label>
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => handleLinkChange(index, 'label', e.target.value)}
                    className="w-full px-3 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text focus:ring-accent focus:border-accent"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">URL</label>
                <div className="flex items-center gap-2">
                <input
                  type="url"
                  value={link.href}
                  onChange={(e) => handleLinkChange(index, 'href', e.target.value)}
                  className="w-full px-3 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text focus:ring-accent focus:border-accent"
                  placeholder="https://example.com"
                  required
                />
                <button
                    type="button"
                    onClick={() => handleRemoveLink(index)}
                    className="p-3 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-full transition-all transform hover:scale-110"
                    aria-label="Remove link"
                >
                    <TrashIcon className="w-5 h-5" />
                </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleAddLink}
          className="w-full py-2 text-center text-sm font-semibold text-accent hover:text-red-700 border-2 border-dashed border-light-border dark:border-dark-border hover:border-accent dark:hover:border-accent rounded-lg transition-all transform hover:scale-105"
        >
          + Add New Link
        </button>

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

export default EditSocialLinksModal;