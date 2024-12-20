import React, { useEffect, useState } from 'react';
import { FaGoogle, FaSpinner, FaMoon, FaSun } from 'react-icons/fa';
import login from '../../assets/images/login.svg';
import logo from '../../assets/icons/logo.png';
import { dict } from '../../utils/dict';
import { useTheme } from '../../context/ThemeContext';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

const LoginForm: React.FC = ({}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<'db' | 'google' | ''>('');
  const [result, setResult] = useState<{ status: string; message: string }>();
  const { currentTheme, setCurrentTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedLanguage = useLanguage();
  const { signIn } = useAuth();

  useEffect(() => {
    setIsDarkMode(currentTheme === 'dark');
  }, [currentTheme]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult({ status: '', message: '' });
    setIsLoading('db');

    if (!email || !password) {
      setIsLoading('');
      return;
    }
    //try {
    //  // Step 1: Sign in with Supabase
    //  const { data: supabaseData, error: supabaseError } = await supabase.auth.signInWithPassword({
    //    email,
    //    password,
    //  });
    //
    //  console.log('supabaseData', supabaseData);
    //  // Check for Supabase sign-in errors
    //  if (supabaseError) {
    //    //  throw new Error(supabaseError.message); // Throw if Supabase returns an error
    //  }
    //
    //  const token = supabaseData?.session?.access_token!;
    //
    //  // Step 2: Authenticate user with your backend
    //  const response = await apiAuthenticateUser(email, password);
    //  console.log('response', response);
    //
    //  if (response.status === 'success') {
    //    // Step 3: Update application state and store token
    //    dispatch(
    //      setUser({
    //        name: response.name || null,
    //        email: response.email, // Ensure email is pulled from response
    //        isLoggedIn: true,
    //      })
    //    );
    //    setResult(response);
    //    sessionStorage.setItem('token', token);
    //
    //    // Navigate to loading screen
    //    navigate('/auth/loading');
    //  } else {
    //    // Handle failure case if the response is not successful
    //    setResult({
    //      status: 'fail',
    //      message: dict[selectedLanguage].loginFailed,
    //    });
    //  }
    //} catch (err) {
    //  console.error('Login error:', err);
    //  // Handle errors and update the result
    //  setResult({
    //    status: 'fail',
    //    message: dict[selectedLanguage].loginFailed,
    //  });
    //} finally {
    //  setIsLoading(''); // Reset loading state
    //}

    const { data, error } = await signIn(email, password);

    if (error) {
      setResult({
        status: 'fail',
        message: dict[selectedLanguage].loginFailed,
      });
    } else {
      sessionStorage.setItem('token', data.session?.access_token!);
      navigate('/auth/loading');
    }
    setIsLoading('');
  };

  const handleGoogleLogin = () => {};

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
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{dict[selectedLanguage].login}</h2>
            <button
              className="text-light-text-primary dark:text-dark-text-primary"
              onClick={() => setCurrentTheme(isDarkMode ? 'light' : 'dark')}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
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

            {/* Login Button */}
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-md bg-light-primary p-3 text-white transition-colors duration-300 hover:bg-light-secondary dark:bg-dark-primary dark:hover:bg-dark-secondary"
            >
              {isLoading === 'db' ? <FaSpinner className="animate-spin" /> : dict[selectedLanguage].login}
            </button>

            {result && result.status === 'fail' && (
              <div className="mt-4 text-center text-base text-light-primary dark:text-dark-primary">
                {result.message}
              </div>
            )}

            {/* Continue with Google */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white p-3 text-gray-900 transition-colors duration-300 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
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

          {/* Signup Link */}
          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            {dict[selectedLanguage].noAccount}{' '}
            <a href="/auth/signup" className="text-light-primary hover:underline dark:text-dark-primary">
              {dict[selectedLanguage].signup}
            </a>
          </p>
        </div>
      </div>
      {/* Right Section: Image */}
      <div className="hidden flex-1 items-center justify-center bg-light-background dark:bg-dark-background md:flex">
        <img src={login} alt={dict[selectedLanguage].loginImageAlt} className="h-auto w-full" />
      </div>
    </div>
  );
};

export default LoginForm;
