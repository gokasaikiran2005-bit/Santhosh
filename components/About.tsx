import React, { useRef } from 'react';
import { FileData, Skill } from '../types';
import useIntersectionObserver from './useIntersectionObserver';

interface AboutProps {
  title: string;
  content: string;
  image: FileData | null;
  skills: Skill[];
}

const About: React.FC<AboutProps> = ({ title, content, image, skills }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const areSkillsVisible = useIntersectionObserver(skillsRef, { threshold: 0.5 });

  return (
    <section 
      ref={sectionRef}
      className={`text-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="group flex items-center justify-center gap-4 mb-6 rounded-lg">
        <h2 className="text-3xl font-bold text-light-text dark:text-dark-text">{title}</h2>
      </div>
      
      <div className="relative rounded-lg transition-all space-y-12">
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
    </section>
  );
};

export default About;