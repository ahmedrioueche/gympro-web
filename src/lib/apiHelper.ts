import { url } from "../config/config";
import client from "../apollo/apolloClient";
import { SEND_VERIFICATION_EMAIL, SIGNUP_USER, AUTHENTICATE_USER } from "../graphql/mutations";
import { Member, User } from "./types";
import { cloudinaryConfig } from "../config/cloudinaryConfig";

interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
}
  
interface ApiResponse {
    status: string; 
    message?: string; 
}

class AppError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "AppError";
    }
}

export const apiSendContactForm = async (data: ContactFormData): Promise<ApiResponse> => {
    try{
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json", Accept: "application/json" },
      });

      if (!response.ok) {
          throw new Error("Failed to send message");
      }

      return response.json();
    }
    catch(error){
      console.log("Failed to send contact form", error);
      return {status: 'error', message: 'An error occured'}
    }
  
};
  
export const apiInsertUser = async (email: string, password: string) : Promise<any> =>{
    try {
        const response = await fetch('/api/auth/insert-user', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })

        if(!response.ok){
            throw new Error("Failed to insert user");
        }

        const responseData = response.json();

        return responseData;
    }
    catch (error) {
        console.log("Failed to insert user", error);
        return {status: 'error', message: 'An error occured'}
    }
}
  
  export const apiSignupUser = async (email: string, password: string, name?: string) => {
    try {
      const response = await client.mutate({
        mutation: SIGNUP_USER,
        variables: {
          email,
          password,
          ...(name && { name }), 
        },
      });
  
      return response.data.signup; 
    } catch (error) {
      if (error instanceof Error) {
        throw new AppError(error.message || "Signup failed");
      } else {
        throw new AppError("An unknown error occurred");
      }
    }
  };
  
  export const apiAuthenticateUser = async (email: string, password: string) => {
    try {
      const response = await client.mutate({
        mutation: AUTHENTICATE_USER,
        variables: {
          email,
          password,
        },
      });
  
      return response.data.authenticateUser; 
    } catch (error) {
      if (error instanceof Error) {
        throw new AppError(error.message || "Authentication failed");
      } else {
        throw new AppError("An unknown error occurred");
      }
    }
  };

export const apiSendVerificationEmail = async (email: string) => {
    try {
      const { data } = await client.mutate({
        mutation: SEND_VERIFICATION_EMAIL,
        variables: { email },
      });
      return data.sendVerificationEmail;
    } catch (error) {
      console.error('Error sending verification email:', error);
      return { success: false, message: 'Error sending verification email' };
    }
  };
  
  export const apiUpdateUser = async (id: number | null, email: string | null | undefined, updateData: Partial<User>) => {
    try {
      const response = await fetch(`${url}/user/update-user`, {
          method: 'POST', 
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({id, email, updateData})
      })

      if(!response.ok){
          throw new Error("Failed to update user");
      }

      const responseData = response.json();

      return responseData;
    }
    catch (error) {
        console.log("Failed to update user", error);
        return {status: 'error', message: 'An error occured'}
    }
  };

  export class MemberApi {

    addMember = async (member: Member) => {
      try {
        const response = await fetch(`${url}/member/add-member`, {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({member})
        })
  
        if(!response.ok){
            throw new Error("Failed to add member");
        }
  
        const responseData = response.json();
  
        return responseData;
      }
      catch (error) {
          console.log("Failed to add member", error);
          return {status: 'error', message: 'An error occured'}
      }
    };
    
  }