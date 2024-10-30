import { gql } from "@apollo/client";

export const VERIFY_TOKEN = gql`
  query VerifyToken($token: String!) {
    verifyToken(token: $token) {
      valid
      message
      user {
        id
        email
        name
        isEmailValidated
      }
    }
  }
`;
