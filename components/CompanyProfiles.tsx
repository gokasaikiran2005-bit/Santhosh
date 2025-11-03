import React, { useRef } from 'react';
import useIntersectionObserver from './useIntersectionObserver';

export interface CompanyProfile {
  id: number;
  name: string;
  role: string;
  duration: string;
  description: string;
}

interface CompanyProfilesProps {
  title: string;
  profiles: CompanyProfile[];
}

const CompanyProfiles: React.FC<CompanyProfilesProps> = ({ title, profiles }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <section 
      ref={sectionRef}
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="flex justify-between items-center mb-10">
        <div className="group flex items-center gap-4 rounded-lg">
          <h2 className="text-3xl font-bold text-light-text dark:text-dark-text">{title}</h2>
        </div>
      </div>
      
      <div className="space-y-8">
        {profiles.map((profile) => (
            <div key={profile.id} className="group bg-light-card/60 dark:bg-dark-card/60 backdrop-blur-lg border border-light-border/30 dark:border-dark-border/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex-grow flex flex-col">
              <div className="flex justify-between items-start gap-2 mb-1">
                <h3 className="font-bold text-xl text-light-text dark:text-dark-text">{profile.name}</h3>
              </div>
              <p className="font-semibold text-accent">{profile.role}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{profile.duration}</p>
              <p className="text-gray-600 dark:text-gray-300 flex-grow">{profile.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompanyProfiles;