import { url } from '../config/config';
import { Member, User } from '../utils/types';

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
    this.name = 'AppError';
  }
}

export const apiSendContactForm = async (data: ContactFormData): Promise<ApiResponse> => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    return response.json();
  } catch (error) {
    console.log('Failed to send contact form', error);
    return { status: 'error', message: 'An error occured' };
  }
};

export const apiInsertUser = async (email: string, password: string): Promise<any> => {
  try {
    const response = await fetch('/api/auth/insert-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Failed to insert user');
    }

    const responseData = response.json();

    return responseData;
  } catch (error) {
    console.log('Failed to insert user', error);
    return { status: 'error', message: 'An error occured' };
  }
};

export const apiUpdateUser = async (id: number | null, email: string | null | undefined, updateData: Partial<User>) => {
  try {
    const response = await fetch(`${url}/user/update-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, email, updateData }),
    });

    if (!response.ok) {
      throw new Error('Failed to update user');
    }

    const responseData = response.json();

    return responseData;
  } catch (error) {
    console.log('Failed to update user', error);
    return { status: 'error', message: 'An error occured' };
  }
};

export class MemberApi {
  addMember = async (member: Member) => {
    try {
      const response = await fetch(`${url}/member/add-member`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ member }),
      });

      if (!response.ok) {
        throw new Error('Failed to add member');
      }

      const responseData = response.json();

      return responseData;
    } catch (error) {
      console.log('Failed to add member', error);
      return { status: 'error', message: 'An error occured' };
    }
  };
}
