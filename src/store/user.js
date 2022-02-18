import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: '',
    isLoggedIn: false,
    username: ''
  },
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.username = action.payload.username;
    },
    logout(state) {
      state.token = '';
      state.isLoggedIn = false;
      state.username = ''
    },
    verify(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.username = action.payload.username;
    }
  }
});

export const userActions = userSlice.actions;
export default userSlice;