// src/hooks/useSignup.ts
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../graphql/mutations';

export const useSignup = () => {
    const [signup, { loading, error }] = useMutation(SIGNUP_USER);
  
    const signupUser = async (email: string, password: string, name?: string) => {
      const { data } = await signup({ 
        variables: { 
          email, 
          password, 
          ...(name && { name }) 
        } 
      });
      return data.signup;
    };
  
    return { signupUser, loading, error };
  };
  