import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    showNav: false,
    showLoading: false
  },
  reducers: {
    toggleNav(state) {
      state.showNav = !state.showNav;
    },
    hideNav(state) {
      console.log('hide nav');
      state.showNav = false;
    },
    showLoading(state) {
      console.log('yo');
      state.showLoading = true;
    },
    hideLoading(state) {
      state.showLoading = false;
    }
  }
});

export const uiActions = uiSlice.actions;
export default uiSlice;