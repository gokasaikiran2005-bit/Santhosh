import React, { useState, useRef, useEffect, ReactElement, ReactNode } from 'react';

interface DropdownProps {
  // FIX: Explicitly type trigger as ReactElement<any> to allow adding props like onClick via React.cloneElement.
  // The default inference was treating its props as `unknown`, causing a type error.
  trigger: ReactElement<any>;
  children: ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const triggerWithProps = React.cloneElement(trigger, {
    onClick: toggleDropdown,
    'aria-haspopup': true,
    'aria-expanded': isOpen,
  });

  return (
    <div className="relative" ref={dropdownRef}>
      {triggerWithProps}
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-56 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg shadow-xl z-20"
          role="menu"
          onClick={() => setIsOpen(false)}
        >
          <div className="py-1">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;