import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import Modal from './Modal';
import { CompanyProfile } from './CompanyProfiles';
import { UploadIcon } from './icons/UploadIcon';
import { TrashIcon } from './icons/TrashIcon';

interface AddProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProfile: (profile: Omit<CompanyProfile, 'id'>) => void;
  onEditProfile: (profile: CompanyProfile) => void;
  existingProfile: CompanyProfile | null;
}

const AddProfileModal: React.FC<AddProfileModalProps> = ({ isOpen, onClose, onAddProfile, onEditProfile, existingProfile }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null); // State for error messages

  useEffect(() => {
    if (isOpen) {
      setError(null); // Clear errors when modal opens
      
      if (existingProfile) {
        setName(existingProfile.name);
        setRole(existingProfile.role);
        setDuration(existingProfile.duration);
        setDescription(existingProfile.description);
      } else {
        setName('');
        setRole('');
        setDuration('');
        setDescription('');
      }
    }
  }, [existingProfile, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    if (!name || !role || !duration || !description) {
      setError('All fields are required.');
      return;
    }

    const profileData = { name, role, duration, description };

    if (existingProfile) {
      onEditProfile({ ...profileData, id: existingProfile.id });
    } else {
      onAddProfile(profileData);
    }

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">
        {existingProfile ? 'Edit Profile' : 'Add Company Profile'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Company Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(null); }}
            required
            className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text focus:ring-accent focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Your Role
          </label>
          <input
            type="text"
            id="role"
            value={role}
            onChange={(e) => { setRole(e.target.value); setError(null); }}
            required
            className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text focus:ring-accent focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Duration
          </label>
          <input
            type="text"
            id="duration"
            value={duration}
            onChange={(e) => { setDuration(e.target.value); setError(null); }}
            required
            placeholder="e.g., 2021 - Present"
            className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text focus:ring-accent focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => { setDescription(e.target.value); setError(null); }}
            required
            rows={4}
            className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text focus:ring-accent focus:border-accent"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 rounded-lg text-red-700 dark:text-red-300 text-sm" role="alert">
            <p>{error}</p>
          </div>
        )}

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
            {existingProfile ? 'Save Changes' : 'Add Profile'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddProfileModal;