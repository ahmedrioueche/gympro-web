// src/features/userSlice.ts
import { User } from '../lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Set initial state
const initialState: User = {
  email: null,
  name: null,
  isLoggedIn: false,
};

// Create the slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        email: string;
        name: string | null;
        isLoggedIn: boolean;
      }>
    ) => {
      const { email, name, isLoggedIn } = action.payload;
      state.email = email;
      state.name = name;
      state.isLoggedIn = isLoggedIn;
    },
    clearUser: state => {
      state.email = null;
      state.name = null;
      state.isLoggedIn = false;
    },
  },
});

// Export actions
export const { setUser, clearUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
