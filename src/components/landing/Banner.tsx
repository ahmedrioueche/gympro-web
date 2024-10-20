"use client"
import React, { useState } from 'react';
import logo from "../../assets/icons/logo.png"; 
import { FaSpinner } from 'react-icons/fa';
import { dict } from '../../lib/dict'; 
import { useNavigate } from 'react-router-dom'; 

const Banner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 
  const selectedLanguage = "english";

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => { 
      navigate('/auth/signup');
      setIsLoading(false);
    }, 500); 
  }

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden bg-cover bg-center" >   
     <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center text-center text-white p-8">
        <img src={logo} alt="Beam Logo" className="h-24 w-24 mb-4" />
        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
          {dict[selectedLanguage].welcome}
        </h1>
        <p className="text-lg mb-6 drop-shadow-md">
          {dict[selectedLanguage].subtitle}
        </p>
        <button
          onClick={handleClick}
          className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 flex items-center justify-center"
        >
          {isLoading ? <FaSpinner className="animate-spin mr-2" /> : dict[selectedLanguage].getStarted}
        </button>
      </div>
    </div>
  );
};

export default Banner;
