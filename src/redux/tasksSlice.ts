import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: string;
  name: string;
  description: string;
  deadline: string;
  category: string;
  status: string;
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: JSON.parse(localStorage.getItem('tasks') || '[]')
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    deleteTasksByCategory: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.category !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
  },
});

export const { addTask , updateTask, deleteTask, deleteTasksByCategory } = tasksSlice.actions;
export default tasksSlice.reducer;
