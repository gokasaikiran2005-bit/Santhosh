import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal';
import { BannerData } from '../types';
import { UploadIcon } from './icons/UploadIcon';

interface EditBannerModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentData: BannerData;
    onSave: (newData: BannerData) => void;
}

const EditBannerModal: React.FC<EditBannerModalProps> = ({ isOpen, onClose, currentData, onSave }) => {
    const [data, setData] = useState(currentData);
    const objectUrlRef = useRef<string | null>(null);
    
    useEffect(() => {
        if (isOpen) {
            setData(currentData);
        } else {
            // Clean up temporary URL if modal is closed without saving
            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
                objectUrlRef.current = null;
            }
        }
    }, [isOpen, currentData]);

    useEffect(() => {
        return () => {
            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
            }
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setData(prevData => ({ ...prevData, [name]: type === 'number' ? Number(value) : value }));
    };

    const handleBackgroundTypeChange = (type: 'color' | 'image' | 'video') => {
        if (type === 'color' && data.backgroundUrl.startsWith('blob:')) {
            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
                objectUrlRef.current = null;
            }
            setData(prevData => ({ ...prevData, backgroundType: type, backgroundUrl: '' }));
        } else {
            setData(prevData => ({ ...prevData, backgroundType: type }));
        }
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const maxSizeInBytes = data.backgroundMaxSize * 1024 * 1024;
            if (file.size > maxSizeInBytes) {
                alert(`File is too large. The maximum allowed size is ${data.backgroundMaxSize}MB.`);
                return;
            }

            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
            }
            const newUrl = URL.createObjectURL(file);
            objectUrlRef.current = newUrl;
            setData(prevData => ({ ...prevData, backgroundUrl: newUrl }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // The parent component is now responsible for the blob URL, so we prevent cleanup in this component
        if (data.backgroundUrl === objectUrlRef.current) {
            objectUrlRef.current = null;
        }
        onSave(data);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">
                Edit Banner
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
                                onClick={() => handleBackgroundTypeChange(type)}
                                className={`capitalize px-4 py-2 rounded-full text-sm font-semibold transition-all transform hover:scale-105 ${
                                    data.backgroundType === type
                                    ? 'bg-accent text-white'
                                    : 'bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text border border-light-border dark:border-dark-border hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {(data.backgroundType === 'image' || data.backgroundType === 'video') && (
                    <div className="space-y-4 p-4 border border-light-border dark:border-dark-border rounded-lg">
                        <div>
                            <label htmlFor="backgroundMaxSize" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                Max File Size (MB)
                            </label>
                            <input
                                type="number"
                                id="backgroundMaxSize"
                                name="backgroundMaxSize"
                                value={data.backgroundMaxSize}
                                onChange={handleChange}
                                min="1"
                                className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text focus:ring-accent focus:border-accent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                Background File
                            </label>
                            {data.backgroundUrl && (
                                <div className="mb-4 relative aspect-video w-full rounded-lg overflow-hidden bg-black">
                                    {data.backgroundType === 'image' ? (
                                        <img src={data.backgroundUrl} alt="Background preview" className="w-full h-full object-contain" />
                                    ) : (
                                        <video src={data.backgroundUrl} controls loop className="w-full h-full object-contain"></video>
                                    )}
                                </div>
                            )}
                             <label
                                htmlFor="background-upload"
                                className="w-full flex items-center justify-center gap-2 cursor-pointer px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-full font-semibold text-light-text dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-700 transition-all transform hover:scale-105"
                            >
                                <UploadIcon className="w-5 h-5" />
                                <span>{data.backgroundUrl ? 'Replace File' : 'Upload File'}</span>
                                <input id="background-upload" name="background-upload" type="file" className="sr-only" onChange={handleFileChange} accept={data.backgroundType === 'image' ? 'image/*' : 'video/*'} />
                            </label>
                        </div>
                    </div>
                )}
                
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text focus:ring-accent focus:border-accent"
                    />
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Content
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        value={data.content}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text focus:ring-accent focus:border-accent"
                    />
                </div>
                <div>
                    <label htmlFor="buttonText" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Button Text
                    </label>
                    <input
                        type="text"
                        id="buttonText"
                        name="buttonText"
                        value={data.buttonText}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text focus:ring-accent focus:border-accent"
                    />
                </div>
                <div>
                    <label htmlFor="buttonLink" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Button Link (URL)
                    </label>
                    <input
                        type="url"
                        id="buttonLink"
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
                        className="px-6 py-2 bg-accent text-white font-bold rounded-full hover:opacity-90 transition-all transform hover:scale-105"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default EditBannerModal;