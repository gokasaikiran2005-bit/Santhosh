import React, { useState, useRef } from 'react';
import type { SocialLink, IconName } from '../types';
import { XIcon } from './icons/XIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { EditIcon } from './icons/EditIcon';
import EditSocialLinksModal from './EditSocialLinksModal';
import { GmailIcon } from './icons/GmailIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { LocationIcon } from './icons/LocationIcon';
import useIntersectionObserver from './useIntersectionObserver';

const iconMap: Record<IconName, React.ReactElement> = {
  X: <XIcon className="w-6 h-6" />,
  LinkedIn: <LinkedInIcon className="w-6 h-6" />,
  Gmail: <GmailIcon className="w-6 h-6" />,
  Phone: <PhoneIcon className="w-6 h-6" />,
  Location: <LocationIcon className="w-6 h-6" />,
};

interface SocialLinksProps {
  links: SocialLink[];
  onLinksChange: (newLinks: SocialLink[]) => void;
  isEditMode: boolean;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ links, onLinksChange, isEditMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <>
      <section 
        ref={sectionRef}
        className={`text-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className={`inline-block rounded-lg ${isEditMode ? 'outline-dashed outline-1 outline-accent/50 p-4' : ''}`}>
          <div className="flex justify-center items-center gap-6 md:gap-8">
            {links.map(({ icon, label, href }, index) => (
              <a
                key={`${label}-${index}`}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-light-text dark:hover:text-dark-text transition-all transform hover:-translate-y-1"
              >
                {iconMap[icon]}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 flex justify-center">
            <button 
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text border border-light-border dark:border-dark-border rounded-full font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-sm flex items-center gap-2 transform hover:scale-105"
                aria-label="Edit social links"
            >
                <EditIcon className="w-4 h-4" />
                Edit Links
            </button>
        </div>
      </section>

      <EditSocialLinksModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentLinks={links}
        onSave={onLinksChange}
      />
    </>
  );
};

export default SocialLinks;