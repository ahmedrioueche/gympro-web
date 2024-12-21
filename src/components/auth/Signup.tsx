import React, { useEffect, useState } from 'react';
import { FaGoogle, FaSpinner, FaMoon, FaSun } from 'react-icons/fa';
import { dict } from '../../utils/dict';
import logo from '../../assets/icons/logo.png';
import { useTheme } from '../../context/ThemeContext';
import signup from '../../assets/images/signup.svg';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState<'db' | 'google' | ''>('');
  const { currentTheme, setCurrentTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [result, setResult] = useState<{ status: string; message: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedLanguage = useLanguage();
  const { signUp } = useAuth();

  useEffect(() => {
    setIsDarkMode(currentTheme === 'dark');
  }, [currentTheme]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading('db');

    if (!email || !password || !confirmPassword) {
      setResult({
        status: 'fail',
        message: dict[selectedLanguage].pleaseFillAllFields,
      });
      return;
    }

    if (password.length < 8) {
      setResult({
        status: 'fail',
        message: dict[selectedLanguage].passwordLength,
      });
      return;
    }

    if (password !== confirmPassword) {
      setResult({
        status: 'fail',
        message: dict[selectedLanguage].passwordsDontMatch,
      });
      return;
    }

    const { data, error } = await signUp(email, password, {});

    if (error) {
      setResult({
        status: 'fail',
        message: dict[selectedLanguage].signUpFailed,
      });
    } else {
      sessionStorage.setItem('token', data.session?.access_token!);
      navigate('/auth/verify');
    }
    setIsLoading('');
  };

  const handleGoogleSignup = () => {
    setIsLoading('google');
  };

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
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{dict[selectedLanguage].signup}</h2>
            <button
              className="text-light-text-primary dark:text-dark-text-primary"
              onClick={() => setCurrentTheme(isDarkMode ? 'light' : 'dark')}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <FaSun className="" size={20} /> : <FaMoon className="" size={20} />}
            </button>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="block w-full rounded-md border border-gray-300 bg-gray-50 p-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-light-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-dark-primary"
                placeholder={dict[selectedLanguage].emailPlaceholder}
              />
              <label
                htmlFor="email"
                className="absolute left-3 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-1 text-sm text-gray-500 duration-300 dark:bg-gray-800 dark:text-gray-400"
              >
                {dict[selectedLanguage].email}
              </label>
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="block w-full rounded-md border border-gray-300 bg-gray-50 p-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-light-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-dark-primary"
                placeholder={dict[selectedLanguage].passwordPlaceholder}
              />
              <label
                htmlFor="password"
                className="absolute left-3 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-1 text-sm text-gray-500 duration-300 dark:bg-gray-800 dark:text-gray-400"
              >
                {dict[selectedLanguage].password}
              </label>
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                className="block w-full rounded-md border border-gray-300 bg-gray-50 p-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-light-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-dark-primary"
                placeholder={dict[selectedLanguage].confirmPasswordPlaceholder}
              />
              <label
                htmlFor="confirm-password"
                className="absolute left-3 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-1 text-sm text-gray-500 duration-300 dark:bg-gray-800 dark:text-gray-400"
              >
                {dict[selectedLanguage].confirmPassword}
              </label>
              {result?.status === 'password_confirmation_error' && (
                <div className="mt-2 text-lg text-light-primary dark:text-dark-primary">{result.message}</div>
              )}
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-md bg-light-primary p-3 text-white transition-colors duration-300 hover:bg-light-secondary dark:bg-dark-primary dark:hover:bg-dark-secondary"
            >
              {isLoading === 'db' ? <FaSpinner className="animate-spin" /> : dict[selectedLanguage].signup}
            </button>
            {result && result.status === 'fail' && (
              <div className="mt-6 text-center text-base text-light-primary dark:text-dark-primary">
                {result.message}
              </div>
            )}
          </form>
          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            {dict[selectedLanguage].alreadyHaveAccount}{' '}
            <a href="/auth/login" className="text-light-primary hover:underline dark:text-dark-primary">
              {dict[selectedLanguage].login}
            </a>
          </p>
        </div>
      </div>
      {/* Right Section: Image */}
      <div className="hidden flex-1 items-center justify-center bg-light-background dark:bg-dark-background md:flex">
        <img
          src={signup}
          alt={dict[selectedLanguage].loginImageAlt}
          className="h-auto w-full"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default SignupForm;
