import { configureStore } from '@reduxjs/toolkit';
import asyncActionMiddleware from '@/redux/middlewares/asyncActionMiddleware';

import uiSlice from '@/redux/slices/uiSlice';
import mealSlice from '@/redux/slices/mealSlice';

export const store = () => {
  return configureStore({
    reducer: {
      ui: uiSlice,
      meal: mealSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(asyncActionMiddleware),
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
