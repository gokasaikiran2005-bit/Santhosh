
import React from 'react';

const CallToAction: React.FC = () => {
  return (
    <section className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-2xl p-8 md:p-12 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-light-text dark:text-dark-text">Let’s collab!</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
        Let's turn your idea into reality with my design experience!
      </p>
      <button className="px-8 py-4 bg-accent text-white font-bold rounded-full hover:bg-red-700 transition-colors text-lg">
        Send a message now!
      </button>
    </section>
  );
};

export default CallToAction;
