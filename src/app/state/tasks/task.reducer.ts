import { createReducer, on } from '@ngrx/store';
import { TaskState } from '../../shared/models/task.model';
import * as TaskActions from './task.actions';

export const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasks, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
    loading: false,
  })),
  on(TaskActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(TaskActions.addTask, (state) => ({
    ...state,
    loading: true,
  })),
  on(TaskActions.addTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
    loading: false,
  })),
  on(TaskActions.addTaskFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(TaskActions.toggleTaskCompletion, (state) => ({
    ...state,
    loading: true,
  })),
  on(TaskActions.toggleTaskCompletionSuccess, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
    loading: false,
  })),
  on(TaskActions.toggleTaskCompletionFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(TaskActions.deleteTask, (state) => ({
    ...state,
    loading: true,
  })),
  on(TaskActions.deleteTaskSuccess, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter((task) => task.id !== id),
    loading: false,
  })),
  on(TaskActions.deleteTaskFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
