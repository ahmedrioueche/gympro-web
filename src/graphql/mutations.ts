
import { gql } from '@apollo/client';

export const SIGNUP_USER = gql`
  mutation SignupUser($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      status
      message
    }
  }
`;

export const SEND_VERIFICATION_EMAIL = gql`
  mutation SendVerificationEmail($email: String!) {
    sendVerificationEmail(email: $email) {
      success
      message
      verificationCode
    }
  }
`;

export const UPDATE_USER_BY_EMAIL = gql`
  mutation UpdateUserByEmail($email: String!, $updateData: UserUpdateInput!) {
    updateUserByEmail(email: $email, updateData: $updateData) {
      success
      message
    }
  }
`;

export const AUTHENTICATE_USER = gql`
  mutation AuthenticateUser($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      status
      message
      token
    }
  }
`;
