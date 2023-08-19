import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: localStorage.getItem('userLoggedIn') === 'true',
    user: null,
  
  },
  reducers: {
   
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
      localStorage.setItem('userLoggedIn', 'true');
      
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.setItem('userLoggedIn', 'false');
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
