import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { createClient, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../utils/supabase';
import { User } from '../utils/types';

interface AuthState {
  user: User | null;
  authUser: SupabaseUser | null;
  loading: boolean;
  error: Error | null;
}

interface AuthReturnType {
  data: any;
  error: any;
}

interface AuthContextType extends AuthState {
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, userData: Partial<User>) => Promise<any>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    authUser: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        fetchUserData(session.user);
      } else {
        setAuthState(prev => ({ ...prev, loading: false }));
      }
    };

    const subscribeToAuthChanges = () => {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          await fetchUserData(session.user);
        } else {
          setAuthState({
            user: null,
            authUser: null,
            loading: false,
            error: null,
          });
        }
      });
      return () => {
        subscription.unsubscribe();
      };
    };

    getSession();
    subscribeToAuthChanges();
  }, []);

  const fetchUserData = async (authUser: SupabaseUser) => {
    try {
      const { data, error } = await supabase.from('user').select('*').eq('id', authUser.id).single();
      if (error) throw error;
      setAuthState({
        user: data,
        authUser,
        loading: false,
        error: null,
      });
    } catch (error) {
      setAuthState({
        user: null,
        authUser: null,
        loading: false,
        error: error as Error,
      });
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      return { data, error };
    } catch (error) {
      setAuthState(prev => ({ ...prev, error: error as Error }));
    }
  };

  const signUp = async (email: string, password: string, userData: Partial<User>) => {
    console.log('SignUp function called with:', { email, password, userData });

    try {
      console.log('Attempting to sign up the user with Supabase');
      const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });

      if (authError) {
        console.error('Supabase auth signUp error:', authError);
        throw authError;
      }

      console.log('Supabase auth signUp response:', authData);

      if (authData.user) {
        console.log('User created in Supabase auth. Inserting user data into the database...');
        const { error: dbError } = await supabase.from('User').insert([
          {
            id: authData.user.id,
            email: authData.user.email,
            ...userData,
          },
        ]);

        if (dbError) {
          console.error('Database insertion error:', dbError);
          throw dbError;
        }
        console.log('User data successfully inserted into database');
      }

      console.log('SignUp successful. Returning auth data.');
      return { data: authData, error: null };
    } catch (error) {
      console.error('SignUp function encountered an error:', error);
      setAuthState(prev => ({ ...prev, error: error as Error }));
      return { data: null, error };
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setAuthState(prev => ({ ...prev, error: error as Error }));
    }
  };

  const isAuthenticated = !!authState.authUser;

  return (
    <AuthContext.Provider value={{ ...authState, isAuthenticated, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
