import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useSelector } from 'react-redux'; 
import { FaMoon, FaSun } from 'react-icons/fa';
import logo from "../../assets/icons/logo.png"; 
import { dict } from "../../lib/dict"; 
import { useTheme } from "../../context/ThemeContext";
import details from "../../assets/images/details.svg";
import { useLanguage } from '../../context/LanguageContext';

const Details: React.FC = () => {
  const navigate = useNavigate();
  const { currentTheme, setCurrentTheme } = useTheme();
  const user = useSelector((state: any) => state.user);
  const selectedLanguage = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOwner, setIsOwner] = useState<"yes" | "no" | "">("");
  const [staffCount, setStaffCount] = useState<number | "">(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isOwner === "yes" && staffCount !== "") {
      // Handle form submission for gym owners
      console.log("Gym owner with", staffCount, "staff members.");
    } else if (isOwner === "no") {
      // Handle form submission for non-gym owners
      console.log("Not a gym owner.");
    }
  };

  const handleBack = () => {
    navigate(-1); // Goes back to the previous page
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Section: Form */}
      <div className="flex-1 flex items-center justify-center bg-white dark:bg-gray-800 p-8">
        <div className="w-full max-w-md">
          {/* Logo and Image at the Top */}
          <a href="/" className="flex flex-row justify-center items-center mb-8 md:mb-4">
            <img
              src={logo}
              alt="Logo"
              className="mb-2"
              width={50}
              height={50}
            />
            <span className="text-4xl ml-2 font-f2 text-light-text-primary dark:text-dark-text-primary">
              {dict[selectedLanguage].logo}
            </span>
          </a>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {dict[selectedLanguage].details}
            </h2>
            <button
              className="text-light-text-primary dark:text-dark-text-primary"
              onClick={()=> setCurrentTheme(isDarkMode? "light" : "dark")}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <FaSun className="" size={20} />
              ) : (
                <FaMoon className="" size={20} />
              )}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Are you a gym owner? */}
            <div className="relative text-light-text-primary dark:text-dark-text-primary">
            <label
                htmlFor="gym-owner"
                className="block text-sm text-start"
            >
                {dict[selectedLanguage].areYouGymOwner || "Are you a gym owner?"}
            </label>
            <div className="flex mt-2">
                <label className="mr-4">
                <input
                    type="radio"
                    name="gym-owner"
                    value="yes"
                    checked={isOwner === "yes"}
                    onChange={() => setIsOwner("yes")}
                    className="mr-2"
                />
                {dict[selectedLanguage].yes || "Yes"}
                </label>
                <label>
                <input
                    type="radio"
                    name="gym-owner"
                    value="no"
                    checked={isOwner === "no"}
                    onChange={() => setIsOwner("no")}
                    className="mr-2"
                />
                {dict[selectedLanguage].no || "No"}
                </label>
            </div>
            </div>

            {/* How many staff members do you have? (Only show if the user is a gym owner) */}
            {isOwner === "yes" && (
            <div className="relative">
                <input
                type="number"
                id="staff-count"
                value={staffCount || ""}
                onChange={(e) => setStaffCount(Number(e.target.value))}
                required
                min="0"
                className="block w-full p-4 text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary no-spinner"
                placeholder={
                    dict[selectedLanguage].staffCountPlaceholder || "How many staff members do you have?"
                }
                />
                <label
                    htmlFor="staff-count"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 left-3 z-10 origin-[0] bg-white dark:bg-gray-800 px-1"
                    >
                    {dict[selectedLanguage].staffCountLabel || "Number of Staff"}
                </label>
            </div>
            )}

            {/* Submit button */}
            <button
                type="submit"
                className="w-full p-3 bg-light-primary dark:bg-dark-primary text-white rounded-md hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors duration-300"
                >
                {dict[selectedLanguage].submit || "Submit"}
            </button>
        </form>
       
        </div>
      </div>
       {/* Right Section: Image */}
       <div className="flex-1 hidden md:flex items-center justify-center bg-light-background dark:bg-dark-background">
        <img
          src={details}
          alt={"details"}
          className="w-full h-auto"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default Details;
