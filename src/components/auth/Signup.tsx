import React, { useEffect, useState } from 'react';
import { FaGoogle, FaSpinner, FaMoon, FaSun } from 'react-icons/fa';
import { dict } from '../../utils/dict';
import logo from '../../assets/icons/logo.png';
import { useTheme } from '../../context/ThemeContext';
import signup from '../../assets/images/signup.svg';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/userSlice';
import { useNavigate } from 'react-router-dom';
import { apiSignupUser } from '../../utils/apiHelper';
import { useLanguage } from '../../context/LanguageContext';
import { setupSupabaseClient, supabase } from '../../utils/supabase';
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

    //try {
    //  // Step 1: Sign up with Supabase
    //  const { data: supabaseData, error: supabaseError } = await supabase.auth.signUp({
    //    email,
    //    password,
    //  });
    //
    //  if (supabaseError) {
    //    throw new Error(supabaseError.message); // Throw if Supabase returns an error
    //  }
    //
    //  // Step 2: Send user data to backend
    //  const response = await apiSignupUser(email, password, '');
    //
    //  if (supabaseData.user) {
    //    // Step 3: Store token and update application state
    //    sessionStorage.setItem('token', supabaseData?.session?.access_token!);
    //    dispatch(
    //      setUser({
    //        name: response.name || null,
    //        email,
    //        isLoggedIn: true,
    //      })
    //    );
    //
    //    setResult(response);
    //    navigate('/auth/verify'); // Navigate to the verification page
    //  } else {
    //    // Handle case where user does not exist
    //    const userMessage =
    //      response.message === 'User already exists'
    //        ? dict[selectedLanguage].userAlreadyExists
    //        : dict[selectedLanguage].signupFailed;
    //
    //    setResult({
    //      status: 'fail',
    //      message: userMessage,
    //    });
    //  }
    //} catch (err) {
    //  // Catch errors from both signup and API call
    //  console.error('Signup error:', err);
    //  setResult({
    //    status: 'fail',
    //    message: err instanceof Error ? err.message : 'Signup failed',
    //  });
    //} finally {
    //  setIsLoading(''); // Reset loading state
    //}

    const { data, error } = await signUp(email, password, {});
    console.log('data', data);
    console.log('error', error);
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
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Section: Form */}
      <div className="flex-1 flex items-center justify-center bg-white dark:bg-gray-800 p-8">
        <div className="w-full max-w-md">
          {/* Logo and Image at the Top */}
          <a href="/" className="flex flex-row justify-center items-center mb-8 md:mb-4">
            <img src={logo} alt="Logo" className="mb-2" width={50} height={50} />
            <span className="text-4xl ml-2 font-f2 text-light-text-primary dark:text-dark-text-primary">
              {dict[selectedLanguage].logo}
            </span>
          </a>

          <div className="flex justify-between items-center mb-6">
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
                className="block w-full p-4 text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                placeholder={dict[selectedLanguage].emailPlaceholder}
              />
              <label
                htmlFor="email"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 left-3 z-10 origin-[0] bg-white dark:bg-gray-800 px-1"
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
                className="block w-full p-4 text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                placeholder={dict[selectedLanguage].passwordPlaceholder}
              />
              <label
                htmlFor="password"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 left-3 z-10 origin-[0] bg-white dark:bg-gray-800 px-1"
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
                className="block w-full p-4 text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                placeholder={dict[selectedLanguage].confirmPasswordPlaceholder}
              />
              <label
                htmlFor="confirm-password"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 left-3 z-10 origin-[0] bg-white dark:bg-gray-800 px-1"
              >
                {dict[selectedLanguage].confirmPassword}
              </label>
              {result?.status === 'password_confirmation_error' && (
                <div className="text-lg mt-2 text-light-primary dark:text-dark-primary">{result.message}</div>
              )}
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full p-3 flex justify-center items-center bg-light-primary dark:bg-dark-primary text-white rounded-md hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors duration-300"
            >
              {isLoading === 'db' ? <FaSpinner className="animate-spin" /> : dict[selectedLanguage].signup}
            </button>
            {result && result.status === 'fail' && (
              <div className="mt-6 text-center text-base text-light-primary dark:text-dark-primary">
                {result.message}
              </div>
            )}
            {/* Continue with Google */}
            <button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full p-3 flex justify-center items-center bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              {isLoading === 'google' ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <div className="flex flex-row">
                  <FaGoogle className="mr-2 mt-1" />
                  {dict[selectedLanguage].continueWithGoogle}
                </div>
              )}
            </button>
          </form>
          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            {dict[selectedLanguage].alreadyHaveAccount}{' '}
            <a href="/auth/login" className="text-light-primary dark:text-dark-primary hover:underline">
              {dict[selectedLanguage].login}
            </a>
          </p>
        </div>
      </div>
      {/* Right Section: Image */}
      <div className="flex-1 hidden md:flex items-center justify-center bg-light-background dark:bg-dark-background">
        <img
          src={signup}
          alt={dict[selectedLanguage].loginImageAlt}
          className="w-full h-auto"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default SignupForm;
