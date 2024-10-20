// store.ts
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state type
interface UserState {
  name: string;
}

// Initial state
const initialState: UserState = {
  name: '',
};

// Create a slice of the store
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

// Export actions
export const { setName } = userSlice.actions;

// Create the store
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

// Define the RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
