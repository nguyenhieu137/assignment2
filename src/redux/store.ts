import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice';
import tasksReducer from './tasksSlice';
const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    tasks: tasksReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;