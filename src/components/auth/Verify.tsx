import React, { useEffect, useRef, useState } from 'react';
import { FaSpinner, FaMoon, FaSun } from 'react-icons/fa';
import { dict } from '../../utils/dict';
import logo from '../../assets/icons/logo.png';
import { useTheme } from '../../context/ThemeContext';
import verify from '../../assets/images/verify.svg';
import { apiSendVerificationCode, apiUpdateUser } from '../../utils/apiHelper';
import { useSelector } from 'react-redux';
import { RootState } from '../../utils/store';
import { capitalizeFirstLetter } from '../../utils/formater';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

function Verify() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setCurrentTheme } = useTheme();
  const [isDarkMode] = useState(false);
  const selectedLanguage = useLanguage();
  const [verificationCode] = useState<string>();
  const codeSentRef = useRef(false);
  const [userEmail, setUserEmail] = useState<string | null>('');
  const [result, setResult] = useState<{ status: string; message: string }>();
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
    if (user.isEmailValidated) {
      navigate('/auth/login');
      return;
    }

    const shouldSendCode = true; //renderCount.current > 2 && user?.email && !codeSentRef.current && !user.isEmailValidated;

    if (shouldSendCode) {
      console.log('sending an email to: ', user?.email);
      handleSendVerificationCode(user.email);
      setUserEmail(user.email);
      codeSentRef.current = true;
    }
  }, [user.email, user.isEmailValidated, navigate]);

  const handleSendVerificationCode = async (email: string | null) => {
    const response = email ? await apiSendVerificationCode(email, '', '') : null;
    console.log('response', response);
    if (response.success) {
      setSentVerificationCode(response.verificationCode);
      setResult({ status: 'success', message: response.message });
    } else {
      setResult({ status: 'success', message: response.message });
    }
  };

  const handleCodeResend = () => {
    if (userEmail && !user.isEmailValidated) {
      handleSendVerificationCode(userEmail);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userVerificationCode) {
      setResult({ status: 'fail', message: 'Please enter the verification code.' });
      return;
    }
    verifyCode(userVerificationCode);
  };

  const verifyCode = async (userVerificationCode: string) => {
    setIsLoading(true);
    setResult({ status: '', message: '' });
    if (sentVerificationCode === userVerificationCode) {
      const updateData = { isEmailValidated: true };
      const response = await apiUpdateUser(null, user?.email, updateData);
      console.log('response', response);
      navigate('/auth/Details');
    } else {
      setResult({ status: 'fail', message: dict[selectedLanguage].verificationFailed });
      setIsLoading(false);
    }
  };

  if (user.isEmailValidated) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left Section: Form */}
      <div className="flex flex-1 items-center justify-center bg-white p-8 dark:bg-gray-800">
        <div className="w-full max-w-md">
          {/* Logo and Image at the Top */}
          <a href="/" className="mb-8 flex flex-row items-center justify-center md:mb-4">
            <img src={logo} alt="Logo" className="mb-2" width={50} height={50} />
            <span className="ml-2 font-f2 text-4xl text-light-text-primary dark:text-dark-text-primary">
              {dict[selectedLanguage].logo}
            </span>
          </a>

          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{dict[selectedLanguage].verifyEmail}</h2>
            <button
              className="text-light-text-primary dark:text-dark-text-primary"
              onClick={() => setCurrentTheme(isDarkMode ? 'light' : 'dark')}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <FaSun className="" size={20} /> : <FaMoon className="" size={20} />}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <input
                type="text"
                id="code"
                value={verificationCode}
                onChange={e => {
                  const newCode = e.target.value;
                  setUserVerificationCode(newCode);
                  if (newCode.length === 6) {
                    verifyCode(newCode);
                  }
                }}
                required
                className="block w-full rounded-md border border-gray-300 bg-gray-50 p-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-light-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-dark-primary"
                placeholder={dict[selectedLanguage].verificationCodePlaceHolder}
              />
              <label
                htmlFor="code"
                className="absolute left-3 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-1 text-sm text-gray-500 duration-300 dark:bg-gray-800 dark:text-gray-400"
              >
                {dict[selectedLanguage].verificationCode}
              </label>
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-md bg-light-primary p-3 text-white transition-colors duration-300 hover:bg-light-secondary dark:bg-dark-primary dark:hover:bg-dark-secondary"
              disabled={isLoading}
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : dict[selectedLanguage].verifyEmail}
            </button>
          </form>
          {result && result.status === 'fail' && (
            <div className="mt-4 text-center text-sm text-light-primary dark:text-dark-primary">{result.message}</div>
          )}
          {!verificationCode ? (
            <div className="ext-gray-500 mt-6 flex flex-col space-y-2 text-center text-sm dark:text-gray-400">
              <p className="">{dict[selectedLanguage].verificationCodeNoReceive}</p>
              <p onClick={() => handleCodeResend()} className="hover:cursor-pointer hover:underline">
                {dict[selectedLanguage].checkSpam}
                {dict[selectedLanguage].clickHereToResend}.
              </p>
            </div>
          ) : (
            <div className="ext-gray-500 mt-6 flex flex-col space-y-2 text-center text-sm dark:text-gray-400">
              <p onClick={() => handleCodeResend()} className="hover:cursor-pointer hover:underline">
                {capitalizeFirstLetter(dict[selectedLanguage].clickHereToResend)}.
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Right Section: Image */}
      <div className="hidden flex-1 items-center justify-center bg-light-background dark:bg-dark-background md:flex">
        <img
          src={verify}
          alt={dict[selectedLanguage].loginImageAlt}
          className="h-auto w-full"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}

export default Verify;
