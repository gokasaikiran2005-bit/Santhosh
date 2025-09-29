import React, { ChangeEvent, useRef } from 'react';
import Modal from './Modal';
import type { FileData } from '../types';
import { DocumentIcon } from './icons/DocumentIcon';
import { UploadIcon } from './icons/UploadIcon';
import { TrashIcon } from './icons/TrashIcon';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resume: FileData | null;
  onResumeChange: (file: File | null) => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, resume, onResumeChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onResumeChange(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6 text-center">Manage Resume</h3>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx"
        />
        {resume ? (
          <div className="space-y-6">
            <div className="flex items-center p-4 bg-light-bg dark:bg-dark-bg rounded-lg border border-light-border dark:border-dark-border">
              <DocumentIcon className="w-8 h-8 text-accent mr-4 flex-shrink-0" />
              <div className="flex-grow truncate">
                <p className="font-semibold text-light-text dark:text-dark-text truncate" title={resume.name}>
                  {resume.name}
                </p>
                <a
                  href={resume.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent hover:underline"
                >
                  View / Download
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleUploadClick}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-700 transition-all font-semibold transform hover:scale-105"
              >
                <UploadIcon className="w-5 h-5" /> Change
              </button>
              <button
                onClick={() => onResumeChange(null)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all font-semibold transform hover:scale-105"
                aria-label="Delete resume"
              >
                <TrashIcon className="w-5 h-5" /> Delete
              </button>
            </div>
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-light-border dark:border-dark-border rounded-lg text-center cursor-pointer hover:border-accent dark:hover:border-accent transition-colors"
            onClick={handleUploadClick}
          >
            <UploadIcon className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
            <p className="text-lg font-semibold text-light-text dark:text-dark-text">Click to upload your resume</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">PDF, DOC, DOCX</p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ResumeModal;