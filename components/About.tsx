import React, { useState, useRef } from 'react';
import { EditIcon } from './icons/EditIcon';
import EditSectionTitleModal from './EditSectionTitleModal';
import EditAboutModal from './EditAboutModal';
import { FileData, Skill } from '../types';
import useIntersectionObserver from './useIntersectionObserver';

interface AboutProps {
  title: string;
  onTitleChange: (newTitle: string) => void;
  content: string;
  onContentChange: (newContent: string) => void;
  image: FileData | null;
  onImageChange: (file: File | null) => void;
  skills: Skill[];
  onSkillsChange: (newSkills: Skill[]) => void;
  isEditMode: boolean;
}

const About: React.FC<AboutProps> = ({ title, onTitleChange, content, onContentChange, image, onImageChange, skills, onSkillsChange, isEditMode }) => {
  const [isTitleModalOpen, setIsTitleModalOpen] = useState(false);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const areSkillsVisible = useIntersectionObserver(skillsRef, { threshold: 0.5 });

  return (
    <>
      <section 
        ref={sectionRef}
        className={`text-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className={`group flex items-center justify-center gap-4 mb-6 rounded-lg ${isEditMode ? 'outline-dashed outline-1 outline-accent/50 p-2' : ''}`}>
          <h2 className="text-3xl font-bold text-light-text dark:text-dark-text">{title}</h2>
          <button
            onClick={() => setIsTitleModalOpen(true)}
            className={`p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-all focus:opacity-100 ${isEditMode ? '!opacity-100' : ''} transform hover:scale-110`}
            aria-label="Edit section title"
          >
            <EditIcon className="w-5 h-5" />
          </button>
        </div>
        
        <div className={`relative rounded-lg transition-all space-y-12 ${isEditMode ? 'outline-dashed outline-1 outline-accent/50 p-4' : ''}`}>
          <div className="space-y-8">
            {image && (
                <div className="flex justify-center">
                    <img 
                        src={image.url}
                        alt="About Santhosh Goka"
                        className="rounded-2xl shadow-lg object-cover w-full max-w-lg"
                        decoding="async"
                    />
                </div>
            )}

            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {content}
            </p>
          </div>

          {skills.length > 0 && (
            <div className="max-w-2xl mx-auto text-left">
              <h3 className="text-2xl font-bold text-light-text dark:text-dark-text text-center mb-6">My Skills</h3>
              <div ref={skillsRef} className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-base font-medium text-light-text dark:text-dark-text">{skill.name}</span>
                      <span className="text-sm font-medium text-light-text dark:text-dark-text">{skill.proficiency}%</span>
                    </div>
                    <div className="w-full bg-light-card dark:bg-dark-card rounded-full h-2.5 border border-light-border/30 dark:border-dark-border/30">
                      <div 
                        className="bg-accent h-2 rounded-full transition-all duration-1000 ease-out" 
                        style={{ width: areSkillsVisible ? `${skill.proficiency}%` : '0%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
         <div className="mt-8 flex justify-center">
            <button 
                onClick={() => setIsContentModalOpen(true)}
                className="px-4 py-2 bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text border border-light-border dark:border-dark-border rounded-full font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-sm flex items-center gap-2 transform hover:scale-105"
                aria-label="Edit about section"
            >
                <EditIcon className="w-4 h-4" />
                Edit About & Skills
            </button>
        </div>
      </section>

      <EditSectionTitleModal
        isOpen={isTitleModalOpen}
        onClose={() => setIsTitleModalOpen(false)}
        currentTitle={title}
        onSave={onTitleChange}
        modalTitle="Edit Section Title"
      />

      <EditAboutModal
        isOpen={isContentModalOpen}
        onClose={() => setIsContentModalOpen(false)}
        currentContent={content}
        onSave={onContentChange}
        currentImage={image}
        onImageChange={onImageChange}
        currentSkills={skills}
        onSkillsChange={onSkillsChange}
      />
    </>
  );
};

export default About;
