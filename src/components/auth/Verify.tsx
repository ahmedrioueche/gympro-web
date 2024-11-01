import React, { useEffect, useRef, useState } from "react";
import { FaSpinner, FaMoon, FaSun } from "react-icons/fa";
import { dict } from "../../lib/dict"; 
import logo from "../../assets/icons/logo.png";
import { useTheme } from "../../context/ThemeContext"; 
import verify from "../../assets/images/verify.svg";
import { apiSendVerificationEmail as apiSendVerificationCode, apiUpdateUser } from "../../lib/apiHelper";
import {useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import { capitalizeFirstLetter } from "../../lib/formater";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLanguage } from '../../context/LanguageContext';

function Verify() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { setCurrentTheme } = useTheme();
    const [isDarkMode] = useState(false);
    const selectedLanguage = useLanguage();
    const [verificationCode] = useState<string>();
    const codeSentRef = useRef(false);
    const [userEmail, setUserEmail] = useState<string | null>('');
    const [result, setResult] = useState<{status: string, message: string}>();
    const [userVerificationCode, setUserVerificationCode] = useState<string>('');
    const [sentVerificationCode, setSentVerificationCode] = useState<string>('');
    const userNotFullData = useSelector((state: RootState) => state.user);
    const { user: userFullData } = useAuth();
    const navigate = useNavigate();
    const user = userFullData || userNotFullData;
    const renderCount = useRef(0);

    useEffect(() => {
      renderCount.current++;
    });
  
    useEffect(() => {
      if(user.isEmailValidated){
        navigate("/auth/login");
        return;
      }

      const shouldSendCode = true; //renderCount.current > 2 && user?.email && !codeSentRef.current && !user.isEmailValidated;
    
      if (shouldSendCode) {
        console.log("sending an email to: ", user?.email);
        handleSendVerificationCode(user.email);  
        setUserEmail(user.email);
        codeSentRef.current = true;
      }
    
    }, [user.email, user.isEmailValidated, navigate]);

    const handleSendVerificationCode = async (email: string | null) => {
        const response = email? await apiSendVerificationCode(email) : null;
        console.log("response", response);
        if (response.success) {
          setSentVerificationCode(response.verificationCode);
          setResult({ status: 'success', message: response.message });
        } else {
          setResult({ status: 'success', message: response.message });
        }
    };

    const handleCodeResend = () => {
        if(userEmail && !user.isEmailValidated){
            handleSendVerificationCode(userEmail);
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userVerificationCode) {
            setResult({ status: 'fail', message: 'Please enter the verification code.' });
            return;
        }
        verifyCode(userVerificationCode);
    };

    const verifyCode = async (userVerificationCode : string) => {
        setIsLoading(true);
        setResult({status: '', message: ''});
        if(sentVerificationCode === userVerificationCode) {
          const userLanguage = navigator.language
          const languageCode = userLanguage.split('-')[0];
          const updateData = { isEmailValidated: true, language: languageCode};
          const response = await apiUpdateUser(null, user?.email, updateData);
          console.log("response", response);
          navigate('/auth/Details'); 
        }
       else {
        setResult({status: 'fail', message: dict[selectedLanguage].verificationFailed})
        setIsLoading(false);
       }
    }

    if (user.isEmailValidated) {
      return null;
    }

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
                  {dict[selectedLanguage].verifyEmail}
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
                {/* Email Input */}
                <div className="relative">
                  <input
                    type="text"
                    id="code"
                    value={verificationCode}
                    onChange={(e) => {
                        const newCode = e.target.value;
                        setUserVerificationCode(newCode);
                        if (newCode.length === 6) {
                            verifyCode(newCode);
                        }
                    }}
                    required
                    className="block w-full p-4 text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                    placeholder={dict[selectedLanguage].verificationCodePlaceHolder}
                  />
                  <label
                    htmlFor="code"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 left-3 z-10 origin-[0] bg-white dark:bg-gray-800 px-1"
                  >
                    {dict[selectedLanguage].verificationCode}
                  </label>
                </div>
                <button
                    type="submit"
                    className="w-full p-3 flex justify-center items-center bg-light-primary dark:bg-dark-primary text-white rounded-md hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors duration-300"
                    disabled={isLoading}
                    >
                        
                    {isLoading? (
                        <FaSpinner className="animate-spin" />
                    ) : (
                        dict[selectedLanguage].verifyEmail
                    )}
                </button>

              </form>
              {result && result.status === "fail" && (
                <div className="mt-4 text-center text-sm text-light-primary dark:text-dark-primary">
                  {result.message}
                </div>
              )}
              {!verificationCode? (
                <div className="flex flex-col space-y-2 mt-6 text-center text-sm ext-gray-500 dark:text-gray-400">
                    <p className="">
                        {dict[selectedLanguage].verificationCodeNoReceive}
                    </p>
                    <p onClick={()=> handleCodeResend()} className="hover:underline hover:cursor-pointer">
                        {dict[selectedLanguage].checkSpam}
                        {dict[selectedLanguage].clickHereToResend}.
                    </p>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 mt-6 text-center text-sm ext-gray-500 dark:text-gray-400">
                    <p onClick={()=> handleCodeResend()} className="hover:underline hover:cursor-pointer">
                         {capitalizeFirstLetter(dict[selectedLanguage].clickHereToResend)}.
                    </p>                
                </div>
              )}
          
            </div>
          </div>
           {/* Right Section: Image */}
           <div className="flex-1 hidden md:flex items-center justify-center bg-light-background dark:bg-dark-background">
            <img
              src={verify}
              alt={dict[selectedLanguage].loginImageAlt}
              className="w-full h-auto"
              width={500}
              height={500}
            />
          </div>
        </div>
      );
}

export default Verify