"use client";
import React, { useEffect, useState } from 'react';
import { FaRocket } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';
import { dict } from '../../lib/dict';
import { useLanguage } from '../../context/LanguageContext';

const CTA: React.FC = () => {
  const selectedLanguage = useLanguage();
  const { currentTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(currentTheme === "dark");
  }, [currentTheme])
  
  // Define animation variants for entrance effect
  const buttonVariants = {
    hidden: { opacity: 0, x: '100%' }, // Start from the right edge of the viewport
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.5
      }
    }
  };

  // Intersection Observer setup
  const { ref, inView } = useInView({
    triggerOnce: false, // Trigger every time it comes into view
    threshold: 0.1
  });

  return (
    <section className={`py-8 px-6 text-center bg-light-background dark:bg-dark-background`}>
      <h2 className={`md:text-3xl text-2xl font-bold font-satisfy mb-4 dark:text-dark-text text-light-primary`}>
        {dict[selectedLanguage].ctaHeading}
      </h2>
      <p className={`md:text-lg text-base mb-6 font-stix text-light-text-primary dark:text-dark-text-primary`}>
      {dict[selectedLanguage].ctaDescription}
      </p>
      <Link to={"/auth/signup"}>
        <motion.button
          id="cta-button"
          ref={ref}
          onClick={() => console.log('CTA Clicked')}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={buttonVariants}
          className={`px-6 py-3 font-stix rounded-md text-dark-text-primary ${isDarkMode ? 'bg-dark-primary hover:bg-dark-secondary' : 'bg-light-primary hover:bg-light-secondary'} font-medium transition-colors duration-300`}
        >
            {dict[selectedLanguage].ctaButton}
           <FaRocket className="inline ml-2" />
        </motion.button>
      </Link>
    </section>
  );
};

export default CTA;
