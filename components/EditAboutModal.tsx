import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import Modal from './Modal';
import { FileData, Skill } from '../types';
import { UploadIcon } from './icons/UploadIcon';
import { TrashIcon } from './icons/TrashIcon';

interface EditAboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentContent: string;
  onSave: (newContent: string) => void;
  currentImage: FileData | null;
  onImageChange: (file: File | null) => void;
  currentSkills: Skill[];
  onSkillsChange: (skills: Skill[]) => void;
}

const EditAboutModal: React.FC<EditAboutModalProps> = ({ isOpen, onClose, currentContent, onSave, currentImage, onImageChange, currentSkills, onSkillsChange }) => {
  const [content, setContent] = useState('');
  const [skills, setSkills] = useState<Skill[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setContent(currentContent);
      setSkills(JSON.parse(JSON.stringify(currentSkills)));
    }
  }, [isOpen, currentContent, currentSkills]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSkillChange = (index: number, field: keyof Skill, value: string | number) => {
    const newSkills = [...skills];
    (newSkills[index] as any)[field] = value;
    setSkills(newSkills);
  };

  const handleAddSkill = () => {
    setSkills([...skills, { name: 'New Skill', proficiency: 50 }]);
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(content);
    onSkillsChange(skills);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">
        Edit About Section
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="about-content" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            About Content
          </label>
          <textarea
            id="about-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={8}
            className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text focus:ring-accent focus:border-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            About Image
          </label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
          {currentImage ? (
            <div className="space-y-4">
              <div className="flex justify-center">
                <img 
                  src={currentImage.url} 
                  alt="About preview"
                  className="w-full max-w-sm rounded-lg object-cover"
                />
              </div>
              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={handleUploadClick}
                  className="px-6 py-2 rounded-lg border border-light-border dark:border-dark-border text-light-text dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-700 transition-all font-semibold transform hover:scale-105"
                >
                  Replace
                </button>
                <button
                  type="button"
                  onClick={() => onImageChange(null)}
                  className="p-3 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all transform hover:scale-110"
                  aria-label="Remove image"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-light-border dark:border-dark-border rounded-lg text-center cursor-pointer hover:border-accent dark:hover:border-accent transition-colors"
              onClick={handleUploadClick}
            >
              <UploadIcon className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
              <p className="text-lg font-semibold text-light-text dark:text-dark-text">Click to upload an image</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">PNG, JPG, GIF</p>
            </div>
          )}
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Skills
          </label>
          <div className="space-y-4 p-4 border border-light-border dark:border-dark-border rounded-lg">
            {skills.map((skill, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                  placeholder="Skill name"
                  className="w-full sm:w-1/3 px-3 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text focus:ring-accent focus:border-accent"
                  required
                />
                <div className="w-full sm:w-2/3 flex items-center gap-3">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={skill.proficiency}
                        onChange={(e) => handleSkillChange(index, 'proficiency', parseInt(e.target.value, 10))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        style={{'--thumb-color': 'var(--color-accent, #FF6F61)'} as React.CSSProperties}
                    />
                    <span className="text-sm font-semibold w-12 text-center">{skill.proficiency}%</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full transition-all"
                  aria-label={`Remove ${skill.name}`}
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            ))}
             <button
              type="button"
              onClick={handleAddSkill}
              className="w-full py-2 text-center text-sm font-semibold text-accent hover:text-red-700 border-2 border-dashed border-light-border dark:border-dark-border hover:border-accent dark:hover:border-accent rounded-lg transition-all"
            >
              + Add Skill
            </button>
          </div>
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

export default EditAboutModal;
