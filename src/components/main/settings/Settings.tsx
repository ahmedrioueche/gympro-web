import React, { useState, ReactNode } from 'react';
import { FaBook, FaTimes, FaSpinner, FaCog, FaPaintBrush, FaUserShield, FaUser, FaBell, FaLock } from 'react-icons/fa';
import CustomDropdown from '../../ui/SelectDropDown';
import { dict } from '../../../lib/dict';
import { IconType } from 'react-icons/lib';
import gym_3 from '../../../assets/images/gym_3.svg';
import { apiUpdateUser } from '../../../lib/apiHelper';
import { useLanguage } from '../../../context/LanguageContext';

interface SettingsSectionProps {
  title: string;
  icon: ReactNode;
  onOpen: () => void;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, icon, onOpen }) => (
  <div 
    className="border rounded-lg cursor-pointer text-light-text-primary dark:text-dark-text-primary bg-light-surface dark:bg-dark-surface hover:bg-gray-100  dark:hover:bg-gray-800 dark:hover:border-dark-text-secondary transition-all"
    onClick={onOpen}
  >
    <div className="flex items-center space-x-4 p-6">
      <div className="text-light-primary dark:text-dark-primary">{icon}</div>
      <h2 className="text-lg lg:text-xl font-medium">{title}</h2>
    </div>
  </div>
);

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  title: string;
  children: ReactNode;
  icon?: IconType; 
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, title, children, icon: Icon }) => {
  const [isLoading, setIsLoading] = useState(false);
  const selectedLanguage = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex items-center mb-4">
          {Icon && <div className="mr-2"><Icon size={20} className='text-light-primary dark:text-dark-primary mr-1' /></div>}
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-light-primary dark:hover:bg-dark-primary hover:text-white ml-auto">
            <FaTimes size={12} />
          </button>
        </div>
        {children}

        <div className="flex justify-end space-x-40 mt-6">
          <button onClick={onClose} className="flex-1 px-4 py-2 text-base font-semibold bg-light-primary dark:bg-dark-primary rounded-lg hover:bg-light-accentPrimary dark:hover:bg-dark-accentPrimary text-dark-text-primary transition duration-200">
            {dict[selectedLanguage].cancel}
          </button>
          <button onClick={() => { onSave(); }} className="flex-1 justify-center items-center px-4 py-2 text-base font-semibold text-white bg-light-secondary dark:bg-dark-secondary rounded-lg hover:bg-light-accentSecondary dark:hover:bg-dark-accentSecondary rounded-lgtransition-colors duration-200"  disabled={isLoading}>
            {isLoading ? <FaSpinner className="animate-spin text-center" /> : dict[selectedLanguage].save}
          </button>
        </div>
      </div>
    </div>
  );
};

const SettingsPage: React.FC = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [dataSharing, setDataSharing] = useState<boolean>(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState<boolean>(false);
  const [notificationEmail, setNotificationEmail] = useState<boolean>(true);
  const [notificationPush, setNotificationPush] = useState<boolean>(true);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [animations, setAnimations] = useState<boolean>(true);
  const [bgImages, setBgImages] = useState<boolean>(true);

  const handleOpenModal = (modalName: string) => setOpenModal(modalName);
  const handleCloseModal = () => setOpenModal(null);

  const handleSave = async (section: any) => {
    console.log("section:", section);
    handleCloseModal();
    console.log("selectedLanguage:", selectedLanguage);
    const updateData = { settings: {language: selectedLanguage}};
    const response = await apiUpdateUser(null, "adsrahmed@gmail.com", updateData);
    console.log("response", response);  
  };

  const languageOptions = [
    { value: 'en', label: dict[selectedLanguage].languages.english },
    { value: 'fr', label: dict[selectedLanguage].languages.french },
    { value: 'ar', label: dict[selectedLanguage].languages.arabic },
    { value: 'es', label: dict[selectedLanguage].languages.spanish },
    { value: 'it', label: dict[selectedLanguage].languages.italian },
    { value: 'ja', label: dict[selectedLanguage].languages.japanese },
  ];


  return (
    <div className="relative z-0 p-6 bg-light-background dark:bg-dark-background scrollbar-hide h-full overflow-auto ">
    {/* Background container with opacity */}
    <div 
      className="absolute inset-0 md:bg-center bg-contain bg-no-repeat opacity-20 md:h-[110%] h-[100%]"
      style={{ backgroundImage: `url(${gym_3})`, }}
    />
    <div className="relative flex flex-col w-full z-10"> {/* Added z-10 to layer content above the background */}
      {/* Grid Section - Two items per row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <SettingsSection
          title={dict[selectedLanguage].languageSettings}
          icon={<FaBook size={28} />}
          onOpen={() => handleOpenModal('language')}
        />
          <SettingsSection
          title={dict[selectedLanguage].accountSettings}
          icon={<FaCog size={28} />}
          onOpen={() => handleOpenModal('account')}
        />
         <SettingsSection
          title={dict[selectedLanguage].appearanceSettings}
          icon={<FaPaintBrush size={28} />}
          onOpen={() => handleOpenModal('appearance')}
        /> 
        <SettingsSection
          title={dict[selectedLanguage].userProfile}
          icon={<FaUser size={28} />}
          onOpen={() => handleOpenModal('profile')}
        />
        <SettingsSection
          title={dict[selectedLanguage].notificationsSettings}
          icon={<FaBell size={28} />}
          onOpen={() => handleOpenModal('notifications')}
        />
        <SettingsSection
          title={dict[selectedLanguage].privacySettings}
          icon={<FaUserShield size={28} />}
          onOpen={() => handleOpenModal('privacy')}
        />
        <SettingsSection
          title={dict[selectedLanguage].securitySettings}
          icon={<FaLock size={28} />}
          onOpen={() => handleOpenModal('security')}
        />
        <SettingsSection
          title={dict[selectedLanguage].dataBackup}
          icon={<FaBook size={28} />}
          onOpen={() => handleOpenModal('dataBackup')}
        />
        </div>
      </div>

      <Modal onSave={()=>handleSave("language")} isOpen={openModal === 'language'} onClose={handleCloseModal} title={dict[selectedLanguage].languageSettings} icon={FaBook}>
        <div className="space-y-4">
          <div className="mb-10 mt-10">
            <CustomDropdown
              options={languageOptions}
              value={selectedLanguage}
              onChange={(newValue) => setSelectedLanguage(newValue)} 
              bgColor='bg-gray-100 dark:bg-gray-800'
              className='h-300'
            />
          </div>
        </div>
       
      </Modal>

      <Modal onSave={()=>handleSave({email, password})} isOpen={openModal === 'profile'} onClose={handleCloseModal} title={dict[selectedLanguage].userProfile} icon={FaUser}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">{dict[selectedLanguage].newEmail}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-light-background dark:bg-dark-background border-2 border-gray-300 dark:border-gray-600 rounded-md outline-none focus:border-light-primary dark:focus:border-dark-primary text-light-text-primary dark:text-dark-text-primary focus:ring-primary focus:border-primary"
              placeholder={dict[selectedLanguage].enterNewEmail}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{dict[selectedLanguage].changePassword}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-light-background dark:bg-dark-background border-2 border-gray-300 dark:border-gray-600 rounded-md outline-none focus:border-light-primary dark:focus:border-dark-primary text-light-text-primary dark:text-dark-text-primary focus:ring-primary focus:border-primary"
              placeholder={dict[selectedLanguage].enterNewPassword}
            />
          </div>
        </div>
      </Modal>

      <Modal onSave={()=>handleSave({dataSharing, twoFactorAuth })} isOpen={openModal === 'privacy'} onClose={handleCloseModal} title={dict[selectedLanguage].privacySettings} icon={FaUserShield}>
        <div className="space-y-6 mt-4 mb-4">
          <div className="flex items-center justify-between">
            <span>{dict[selectedLanguage].dataSharing}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={dataSharing} onChange={(e) => setDataSharing(e.target.checked)} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-light-primary peer-checked:bg-light-primary dark:bg-gray-600 dark:peer-checked:bg-dark-primary"></div>
              <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-6"></span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span>{dict[selectedLanguage].twoFactorAuthentication}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={twoFactorAuth} onChange={(e) => setTwoFactorAuth(e.target.checked)} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-light-primary peer-checked:bg-light-primary dark:bg-gray-600 dark:peer-checked:bg-dark-primary"></div>
              <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-6"></span>
            </label>
          </div>
        </div>
      
      </Modal>

      <Modal onSave={()=>handleSave({notificationEmail, notificationPush})} isOpen={openModal === 'security'} onClose={handleCloseModal} title={dict[selectedLanguage].securitySettings} icon={FaLock}>
        <div className="space-y-4">
          
        </div>
      
      </Modal>

      <Modal onSave={()=>handleSave(dataSharing)} isOpen={openModal === 'account'} onClose={handleCloseModal} title={dict[selectedLanguage].accountSettings} icon={FaCog}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>{dict[selectedLanguage].accountPrivacy}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={dataSharing} onChange={(e) => setDataSharing(e.target.checked)} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-light-primary peer-checked:bg-light-primary dark:bg-gray-600 dark:peer-checked:bg-dark-primary"></div>
              <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-6"></span>
            </label>
          </div>
        </div>
      
      </Modal>

      <Modal onSave={()=>handleSave({notificationEmail, notificationPush})} isOpen={openModal === 'notifications'} onClose={handleCloseModal} title={dict[selectedLanguage].notificationsSettings} icon={FaBell}>
        <div className="space-y-4">
          <div className='  grid grid-col-1 gap-4'>
            <div className="flex items-center justify-between">
                <span>{dict[selectedLanguage].notificationEmail}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={notificationEmail} onChange={(e) => setNotificationEmail(e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:bg-light-primary dark:peer-checked:bg-dark-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
            </div>
            <div className="flex items-center justify-between">
                <span>{dict[selectedLanguage].notificationPush}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={notificationPush} onChange={(e) => setNotificationPush(e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:bg-light-primary dark:peer-checked:bg-dark-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
            </div>
        </div>
        </div>
      </Modal>

      <Modal onSave={()=>handleSave({notificationEmail, notificationPush})} title={dict[selectedLanguage].dataBackup} isOpen={openModal === 'dataBackup'} onClose={handleCloseModal} icon={FaBook}>
        <div className="space-y-4">
          <div className='  grid grid-col-1 gap-4'>
            <div className="flex items-center justify-between">
                <span>{dict[selectedLanguage].notificationEmail}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={notificationEmail} onChange={(e) => setNotificationEmail(e.target.checked)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:bg-light-primary dark:peer-checked:bg-dark-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
            </div>
            <div className="flex items-center justify-between">
                <span>{dict[selectedLanguage].notificationPush}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={notificationPush} onChange={(e) => setNotificationPush(e.target.checked)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:bg-light-primary dark:peer-checked:bg-dark-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
            </div>
        </div>
        </div>
      </Modal>

      <Modal onSave={()=>handleSave({notificationEmail, notificationPush})} isOpen={openModal === 'appearance'} onClose={handleCloseModal} title={dict[selectedLanguage].appearanceSettings} icon={FaPaintBrush}>
        <div className="space-y-6 mt-2 mb-2">
          <div className='grid grid-col-1 gap-4'>
            <div className="flex items-center justify-between">
              <span>{dict[selectedLanguage].animations}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={animations} onChange={(e) => setAnimations(e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:bg-light-primary dark:peer-checked:bg-dark-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span>{dict[selectedLanguage].bgImages}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={bgImages} onChange={(e) => setBgImages(e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:bg-light-primary dark:peer-checked:bg-dark-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SettingsPage;
