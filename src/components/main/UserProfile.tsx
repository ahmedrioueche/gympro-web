import React, { useState } from 'react';
import { Card, CardContent } from '../ui/Cards';
import { User, LogOut, Mail, Crown, Save, X } from 'lucide-react';
import gym_2 from '../../assets/images/gym_2.svg';
import { dict } from '../../lib/dict';
import { useLanguage } from '../../context/LanguageContext';

const UserProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    membership: 'Premium',
  });
  const selectedLanguage = useLanguage();

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = () => {
    // Add your save logic here
    setIsEditing(false);
  };

  return (
    <div className="relative min-h-screen w-full bg-light-background dark:bg-dark-background flex items-center justify-center p-6">
      {/* Background image with smooth opacity */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={gym_2}
          alt={dict[selectedLanguage].gymBackgroundAlt}
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      {/* Main Content */}
      <div className="relative z-0 w-full max-w-4xl opacity-90">
        <Card className="bg-light-surface dark:bg-dark-surface backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden border-0">
          <CardContent className="p-8">
            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-8 py-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl text-start font-bold text-gray-800 dark:text-white">
                  {isEditing ? dict[selectedLanguage].editProfile : dict[selectedLanguage].yourProfile}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">{dict[selectedLanguage].manageProfile}</p>
              </div>
              <button
                onClick={handleEditToggle}
                className="ml-auto flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300
                         hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-300"
              >
                {isEditing ? (
                  <>
                    <X className="w-5 h-5" />
                    {dict[selectedLanguage].cancel}
                  </>
                ) : (
                  dict[selectedLanguage].editProfile
                )}
              </button>
            </div>

            {/* User Info Form */}
            <div className="space-y-6">
              <div className="group">
                <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2">
                  <User className="w-5 h-5" />
                  {dict[selectedLanguage].name}
                </label>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl
                          border-2 border-transparent focus:border-light-secondary dark:focus:border-dark-secondary
                          outline-none transition-all duration-300
                          text-gray-800 dark:text-gray-200
                          disabled:bg-gray-100 dark:disabled:bg-gray-800/30
                          shadow-sm hover:shadow-md focus:shadow-lg"
                />
              </div>

              <div className="group">
                <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2">
                  <Mail className="w-5 h-5" />
                  {dict[selectedLanguage].email}
                </label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl
                          border-2 border-transparent focus:border-light-secondary dark:focus:border-dark-secondary
                          outline-none transition-all duration-300
                          text-gray-800 dark:text-gray-200
                          disabled:bg-gray-100 dark:disabled:bg-gray-800/30
                          shadow-sm hover:shadow-md focus:shadow-lg"
                />
              </div>

              <div className="group">
                <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2">
                  <Crown className="w-5 h-5" />
                  {dict[selectedLanguage].membershipType}
                </label>
                <input
                  type="text"
                  name="membership"
                  value={userData.membership}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl
                          border-2 border-transparent focus:border-light-secondary dark:focus:border-dark-secondary
                          outline-none transition-all duration-300
                          text-gray-800 dark:text-gray-200
                          disabled:bg-gray-100 dark:disabled:bg-gray-800/30
                          shadow-sm hover:shadow-md focus:shadow-lg"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end items-center gap-4 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              {isEditing && (
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-purple-500 to-blue-500
                           text-white rounded-xl hover:shadow-lg transform hover:-translate-y-0.5
                           transition-all duration-300"
                >
                  <Save className="w-5 h-5" />
                  {dict[selectedLanguage].saveChanges}
                </button>
              )}
              <button
                onClick={() => alert(dict[selectedLanguage].loggingOut)}
                className="flex items-center gap-2 px-6 py-3
                          text-gray-600 dark:text-gray-300
                          hover:bg-gray-100 dark:hover:bg-gray-800/50
                          rounded-xl transition-all duration-300"
              >
                <LogOut className="w-5 h-5" />
                {dict[selectedLanguage].logOut}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfilePage;
