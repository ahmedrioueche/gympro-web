import { Navigate, useLocation } from 'react-router-dom';
import Loading from './auth/Loading';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();
  const token = localStorage.getItem('token');

  // Special case for verification route right after signup
  if ((location.pathname === '/auth/verify' && token) || (location.pathname === '/auth/loading' && token)) {
    return <>{children}</>;
  }

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
