import React, { useState, useRef } from 'react';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';
import AddProfileModal from './AddProfileModal';
import ConfirmationModal from './ConfirmationModal';
import EditSectionTitleModal from './EditSectionTitleModal';
import useIntersectionObserver from './useIntersectionObserver';
import { PlusIcon } from './icons/PlusIcon';

export interface CompanyProfile {
  id: number;
  name: string;
  role: string;
  duration: string;
  description: string;
}

interface CompanyProfilesProps {
  title: string;
  onTitleChange: (newTitle: string) => void;
  isEditMode: boolean;
  profiles: CompanyProfile[];
  onProfilesChange: (profiles: CompanyProfile[]) => void;
  onEnterEditMode: () => void;
}

const CompanyProfiles: React.FC<CompanyProfilesProps> = ({ title, onTitleChange, isEditMode, profiles, onProfilesChange, onEnterEditMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<CompanyProfile | null>(null);
  const [deletingProfile, setDeletingProfile] = useState<CompanyProfile | null>(null);
  const [isTitleModalOpen, setIsTitleModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });


  const handleAddProfile = (profile: Omit<CompanyProfile, 'id'>) => {
    const newProfile = { ...profile, id: profiles.length > 0 ? Math.max(...profiles.map(p => p.id)) + 1 : 1 };
    onProfilesChange([...profiles, newProfile]);
  };

  const handleEditProfile = (profile: CompanyProfile) => {
    onProfilesChange(profiles.map(p => p.id === profile.id ? profile : p));
  };
  
  const handleDeleteProfile = () => {
    if (deletingProfile) {
      onProfilesChange(profiles.filter(p => p.id !== deletingProfile.id));
      setDeletingProfile(null);
    }
  };

  const openEditModal = (profile: CompanyProfile) => {
    setEditingProfile(profile);
    setIsModalOpen(true);
  }
  
  const openDeleteModal = (profile: CompanyProfile) => {
    setDeletingProfile(profile);
  }

  const openAddModal = () => {
    onEnterEditMode();
    setEditingProfile(null);
    setIsModalOpen(true);
  }

  return (
    <>
      <section 
        ref={sectionRef}
        className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="flex justify-between items-center mb-10">
          <div className={`group flex items-center gap-4 rounded-lg ${isEditMode ? 'outline-dashed outline-1 outline-accent/50 p-2' : ''}`}>
            <h2 className="text-3xl font-bold text-light-text dark:text-dark-text">{title}</h2>
            <button
              onClick={() => setIsTitleModalOpen(true)}
              className={`p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-all focus:opacity-100 ${isEditMode ? '!opacity-100' : ''} transform hover:scale-110`}
              aria-label="Edit section title"
            >
              <EditIcon className="w-5 h-5" />
            </button>
          </div>
          <button 
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-white font-bold rounded-full hover:opacity-90 transition-all text-sm transform hover:scale-105"
          >
            <PlusIcon className="w-4 h-4" />
            Add Profile
          </button>
        </div>
        
        <div className="space-y-8">
          {profiles.map((profile) => (
             <div key={profile.id} className={`group bg-light-card/60 dark:bg-dark-card/60 backdrop-blur-lg border border-light-border/30 dark:border-dark-border/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isEditMode ? 'outline-dashed outline-1 outline-accent/50' : ''}`}>
              <div className="flex-grow flex flex-col">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h3 className="font-bold text-xl text-light-text dark:text-dark-text">{profile.name}</h3>
                  <div className={`flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity ${isEditMode ? '!opacity-100' : ''}`}>
                    <button
                        onClick={() => openEditModal(profile)}
                        className="p-2 text-light-text dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-transform transform hover:scale-110"
                        aria-label="Edit profile"
                    >
                        <EditIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => openDeleteModal(profile)}
                        className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full transition-transform transform hover:scale-110"
                        aria-label="Delete profile"
                    >
                        <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <p className="font-semibold text-accent">{profile.role}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{profile.duration}</p>
                <p className="text-gray-600 dark:text-gray-300 flex-grow">{profile.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <AddProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProfile={handleAddProfile}
        onEditProfile={handleEditProfile}
        existingProfile={editingProfile}
      />

      <ConfirmationModal
        isOpen={!!deletingProfile}
        onClose={() => setDeletingProfile(null)}
        onConfirm={handleDeleteProfile}
        title="Delete Profile"
        message={`Are you sure you want to delete the profile for "${deletingProfile?.name}"? This action cannot be undone.`}
        confirmText="Delete"
      />

      <EditSectionTitleModal
        isOpen={isTitleModalOpen}
        onClose={() => setIsTitleModalOpen(false)}
        currentTitle={title}
        onSave={onTitleChange}
        modalTitle="Edit Section Title"
      />
    </>
  );
};

export default CompanyProfiles;