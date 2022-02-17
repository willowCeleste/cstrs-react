import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './ui';
import userSlice from './user';

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    user: userSlice.reducer
  }
});

export default store;