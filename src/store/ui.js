import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    showNav: false
  },
  reducers: {
    toggleNav(state) {
      state.showNav = !state.showNav;
    },
    hideNav(state) {
      state.showNav = false;
    }
  }
});

export const uiActions = uiSlice.actions;
export default uiSlice;