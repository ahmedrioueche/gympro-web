import { dict } from '../../lib/dict';
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Footer: React.FC = () => {
  const selectedLanguage = useLanguage();
  return (
    <footer className="bg-light-background dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary py-4">
      <div className="max-w-7xl mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} {dict[selectedLanguage].logo}. {dict[selectedLanguage].allRightsReserved}.</p>
        <ul className="flex justify-center space-x-4 mt-2">
          <li>
            <a href="/privacy-policy" className="hover:underline text-light-text-primary dark:text-dark-text-primary">
              {dict[selectedLanguage].privacyPolicy}
            </a>
          </li>
          <li>
            <a href="/terms-of-service" className="hover:underline text-light-text-primary dark:text-dark-text-primary">
              {dict[selectedLanguage].termsOfService}
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:underline text-light-text-primary dark:text-dark-text-primary">
              {dict[selectedLanguage].contact}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
