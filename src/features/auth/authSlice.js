import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log('Setting credentials:', action.payload); // Log the payload
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      console.log('Logging out'); // Log when logging out
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;