import client from '../apollo/apolloClient';
import { VERIFY_TOKEN } from '../graphql/queries';
import { User } from '../lib/types';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
}

interface VerifyTokenResponse {
  verifyToken: {
    valid: boolean;
    message: string;
    user: User | null;
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(()=> {
  }, [user])

  const verifyToken = async (token: string) => {
    try {
      const { data } = await client.query<VerifyTokenResponse>({
        query: VERIFY_TOKEN,
        variables: { token },
        fetchPolicy: 'network-only' // Important: Don't cache token verification
      });

      if (data?.verifyToken?.valid && data.verifyToken.user) {
        setIsAuthenticated(true);
        setUser(data.verifyToken.user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('token'); // Clear invalid token
      }
    } catch (error) {
      console.error('Token verification error:', error);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('token'); // Clear token on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
