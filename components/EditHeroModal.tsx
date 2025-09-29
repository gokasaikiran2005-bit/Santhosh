import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { HeroData } from '../types';

interface EditHeroModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentData: HeroData;
    onSave: (newData: HeroData) => void;
}

const EditHeroModal: React.FC<EditHeroModalProps> = ({ isOpen, onClose, currentData, onSave }) => {
    const [data, setData] = useState(currentData);
    
    useEffect(() => {
        if (isOpen) {
            setData(currentData);
        }
    }, [isOpen, currentData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(data);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">
                Edit Hero Section
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="titleHero" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="titleHero"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text focus:ring-accent focus:border-accent"
                    />
                </div>
                <div>
                    <label htmlFor="contentHero" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Content
                    </label>
                    <textarea
                        id="contentHero"
                        name="content"
                        value={data.content}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text focus:ring-accent focus:border-accent"
                    />
                </div>
                <div>
                    <label htmlFor="buttonTextHero" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Button Text
                    </label>
                    <input
                        type="text"
                        id="buttonTextHero"
                        name="buttonText"
                        value={data.buttonText}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text focus:ring-accent focus:border-accent"
                    />
                </div>
                <div>
                    <label htmlFor="buttonLinkHero" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Button Link (URL)
                    </label>
                    <input
                        type="url"
                        id="buttonLinkHero"
                        name="buttonLink"
                        value={data.buttonLink}
                        onChange={handleChange}
                        placeholder="https://example.com"
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
                        className="px-6 py-2 bg-accent text-white font-bold rounded-full hover:bg-red-700 transition-all transform hover:scale-105"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default EditHeroModal;