import React from 'react';
import Modal from './Modal';
import { CheckIcon } from './icons/CheckIcon';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAccentColor: string;
  onAccentColorChange: (color: string) => void;
}

const accentColors = [
  { name: 'Coral', value: '#FF6F61' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Green', value: '#10B981' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Amber', value: '#F59E0B' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Teal', value: '#14B8A6' },
  { name: 'Indigo', value: '#6366F1' },
  { name: 'Rose', value: '#F43F5E' },
  { name: 'Sky', value: '#0EA5E9' },
  { name: 'Lime', value: '#84CC16' },
  { name: 'Gray', value: '#6B7280' },
  { name: 'Orange', value: '#F97316' },
  { name: 'Cyan', value: '#06B6D4' },
  { name: 'Violet', value: '#7C3AED' },
  { name: 'Fuchsia', value: '#D946EF' },
  { name: 'Slate', value: '#64748B' },
  { name: 'Brown', value: '#A16207' },
];

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, currentAccentColor, onAccentColorChange }) => {

  const handleColorSelect = (colorValue: string) => {
    onAccentColorChange(colorValue);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">
        Theme Settings
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Accent Color
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {accentColors.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => handleColorSelect(color.value)}
                className={`relative w-full aspect-square rounded-full transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-card dark:focus:ring-offset-dark-card ${currentAccentColor === color.value ? 'ring-accent' : 'ring-transparent'}`}
                style={{ backgroundColor: color.value }}
                aria-label={`Select ${color.name} accent color`}
              >
                {currentAccentColor === color.value && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
                    <CheckIcon className="w-8 h-8 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
       <div className="pt-8 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-accent text-white font-bold rounded-full hover:opacity-90 transition-all transform hover:scale-105"
          >
            Done
          </button>
        </div>
    </Modal>
  );
};

export default SettingsModal;