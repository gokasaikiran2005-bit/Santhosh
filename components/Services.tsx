import React, { useRef } from 'react';
import useIntersectionObserver from './useIntersectionObserver';

interface ServicesProps {
  title: string;
  services: string[];
}

const Services: React.FC<ServicesProps> = ({ title, services }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <section 
      ref={sectionRef}
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="group flex items-center justify-center gap-4 mb-10 rounded-lg">
        <h2 className="text-3xl font-bold text-light-text dark:text-dark-text">{title}</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 rounded-lg">
        {services.map((service) => (
          <span
            key={service}
            className="px-5 py-2 bg-light-card/60 dark:bg-dark-card/60 backdrop-blur-sm text-light-text dark:text-dark-text rounded-full border border-light-border/30 dark:border-dark-border/30 text-sm md:text-base font-medium transition-colors duration-300"
          >
            {service}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Services;