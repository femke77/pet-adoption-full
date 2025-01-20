import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../interfaces/User';
import CryptoJS from 'crypto-js';

const secretKey = import.meta.env.VITE_SECRET_KEY;

interface AuthState {
  isAuthenticated: boolean;
  userData: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userData: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      state.userData = action.payload;
      const encryptedUserDetails = CryptoJS.AES.encrypt(
        JSON.stringify(action.payload),
        secretKey,
      ).toString();
      sessionStorage.setItem('ud', encryptedUserDetails);
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.userData = null;
      sessionStorage.removeItem('ud');
    },
  },
});

export const { startLoading, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
