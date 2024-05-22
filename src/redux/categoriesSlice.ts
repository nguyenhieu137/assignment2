import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from './store';
import { deleteTasksByCategory } from './tasksSlice';

interface Category {
  name: string;
  color: string;
}

interface CategoriesState {
  categories: Category[];
}

const initialState: CategoriesState = {
  categories: JSON.parse(localStorage.getItem('categories') || '[]')
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
      localStorage.setItem('categories', JSON.stringify(state.categories));
    },
    deleteCategory: (state, action: PayloadAction<number>) => {
      const category = state.categories[action.payload];
      state.categories.splice(action.payload, 1);
      localStorage.setItem('categories', JSON.stringify(state.categories));
      (dispatch: AppDispatch) => {
        dispatch(deleteTasksByCategory(category.name));
      }
    },
  },
});

export const { addCategory, deleteCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
