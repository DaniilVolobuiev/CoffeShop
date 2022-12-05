import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/FilterSlice';
import cartReducer from './slices/CartSlice';
import itemsReducer from './slices/ItemsSlice';
import userReducer from './slices/UserSlice';

export const store = configureStore({
  reducer: {
    filterReducer,
    cartReducer,
    itemsReducer,
    userReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
