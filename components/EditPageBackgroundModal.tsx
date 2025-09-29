import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal';
import { PageBackground, Theme } from '../types';
import { UploadIcon } from './icons/UploadIcon';

interface EditPageBackgroundModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentBackground: PageBackground;
    onSave: (newBackground: PageBackground) => void;
    theme: Theme;
}

const EditPageBackgroundModal: React.FC<EditPageBackgroundModalProps> = ({ isOpen, onClose, currentBackground, onSave, theme }) => {
    const [background, setBackground] = useState(currentBackground);
    const objectUrlRef = useRef<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            const defaultColors = { light: '#FFFFFF', dark: '#121212' };
            const initialBg = { ...currentBackground };
            // If the color is empty, set it to the current theme's default
            if (initialBg.type === 'color' && !initialBg.value) {
                initialBg.value = defaultColors[theme];
            }
            setBackground(initialBg);
        } else {
            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
                objectUrlRef.current = null;
            }
        }
    }, [isOpen, currentBackground, theme]);

    useEffect(() => {
        return () => {
            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
            }
        };
    }, []);

    const handleTypeChange = (type: 'color' | 'image' | 'video') => {
        if (type === 'color' && background.value.startsWith('blob:')) {
            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
                objectUrlRef.current = null;
            }
            const defaultColors = { light: '#FFFFFF', dark: '#121212' };
            setBackground({ type: 'color', value: defaultColors[theme] });
        } else {
            setBackground(prev => ({ ...prev, type }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
            }
            const newUrl = URL.createObjectURL(file);
            objectUrlRef.current = newUrl;
            setBackground(prev => ({ ...prev, value: newUrl }));
        }
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBackground({ type: 'color', value: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (background.value === objectUrlRef.current) {
            objectUrlRef.current = null;
        }
        onSave(background);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">
                Edit Page Background
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Background Type
                    </label>
                    <div className="flex gap-4">
                        {(['color', 'image', 'video'] as const).map(type => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => handleTypeChange(type)}
                                className={`capitalize px-4 py-2 rounded-full text-sm font-semibold transition-all transform hover:scale-105 ${
                                    background.type === type
                                    ? 'bg-accent text-white'
                                    : 'bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text border border-light-border dark:border-dark-border hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {background.type === 'color' && (
                     <div>
                        <label htmlFor="bgColor" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                            Background Color
                        </label>
                        <div className="relative flex items-center p-2 border border-light-border dark:border-dark-border rounded-lg">
                           <input
                                type="color"
                                id="bgColor"
                                value={background.value}
                                onChange={handleColorChange}
                                className="w-10 h-10 p-0 border-none rounded cursor-pointer bg-transparent"
                            />
                            <span className="ml-3 font-mono text-light-text dark:text-dark-text">{background.value}</span>
                        </div>
                    </div>
                )}

                {(background.type === 'image' || background.type === 'video') && (
                    <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                            Background File
                        </label>
                        {background.value && background.value.startsWith('blob:') && (
                            <div className="mb-4 relative aspect-video w-full rounded-lg overflow-hidden bg-black">
                                {background.type === 'image' ? (
                                    <img src={background.value} alt="Background preview" className="w-full h-full object-contain" />
                                ) : (
                                    <video src={background.value} controls loop className="w-full h-full object-contain"></video>
                                )}
                            </div>
                        )}
                         <label
                            htmlFor="background-upload"
                            className="w-full flex items-center justify-center gap-2 cursor-pointer px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-full font-semibold text-light-text dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-700 transition-all transform hover:scale-105"
                        >
                            <UploadIcon className="w-5 h-5" />
                            <span>{background.value.startsWith('blob:') ? 'Replace File' : 'Upload File'}</span>
                            <input id="background-upload" name="background-upload" type="file" className="sr-only" onChange={handleFileChange} accept={background.type === 'image' ? 'image/*' : 'video/*'} />
                        </label>
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
                        Save Changes
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default EditPageBackgroundModal;