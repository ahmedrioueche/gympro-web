import React from 'react';
import { motion } from 'framer-motion';
import { dict } from '../../utils/dict';
import { featureTexts } from '../../utils/data';
import { useLanguage } from '../../context/LanguageContext';

const Features = () => {
  const selectedLanguage = useLanguage();
  return (
    <section id="features">
      <div className={`py-12 px-6 bg-light-background dark:bg-dark-background`}>
        <h2
          className={`md:text-3xl text-2xl font-bold text-center mb-6 font-satisfy dark:text-dark-text text-light-primary`}
        >
          {dict[selectedLanguage].importantFeatures}
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureTexts.features.map((feature, index) => (
            <motion.div
              key={index}
              className={`shadow-lg rounded-lg p-6 text-light-text-primary dark:text-dark-text-primary bg-light-surface dark:bg-dark-surface transition duration-300`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className={`text-xl font-semibold`}>{feature.title}</h3>
              <p className={`mt-2 text-light-text-secondary dark:text-dark-text-secondary`}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
