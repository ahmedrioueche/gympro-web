'use client';

import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { faqs } from '../../utils/data';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false });

  const variants = {
    hidden: { opacity: 0, x: 100 }, // Start hidden to the right
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } }, // Move to original position
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      className={`border-none mb-4 text-dark-text-primary focus:outline-none`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full font-stix text-left py-4 px-6 flex justify-between items-center rounded-md bg-gradient-to-r from-blue-600 to-purple-400 dark:from-blue-800 dark:to-purple-600`}
      >
        <span className="font-semibold text-dark-text">{question}</span>
        <span className={`transform ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform text-dark-text`}>
          &#9662;
        </span>
      </button>
      {isOpen && (
        <div
          className={`px-6 py-4 mt-2 text-start rounded-md shadow-md bg-gradient-to-r from-blue-600 to-purple-400 dark:from-blue-800 dark:to-purple-600 transition-colors`}
        >
          {answer}
        </div>
      )}
    </motion.div>
  );
};

const FAQ: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');
  }, []);

  return (
    <section className={`py-16 dark:bg-dark-background bg-light-background`}>
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl font-bold text-center mb-6 font-satisfy dark:text-dark-text text-light-primary`}>
          Frequently Asked Questions
        </h2>
        <div className="w-full max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
