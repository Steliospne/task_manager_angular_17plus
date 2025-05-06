import { createAction, props } from '@ngrx/store';
import { Task } from '../../shared/models/task.model';

export const loadTasks = createAction('[Task] Load Tasks');
export const loadTasksSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ tasks: Task[] }>()
);
export const loadTasksFailure = createAction(
  '[Task] Load Tasks Failure',
  props<{ error: string }>()
);

export const addTask = createAction(
  '[Task] Add Task',
  props<{ task: Omit<Task, 'id' | 'createdAt'> }>()
);
export const addTaskSuccess = createAction(
  '[Task] Add Task Success',
  props<{ task: Task }>()
);
export const addTaskFailure = createAction(
  '[Task] Add Task Failure',
  props<{ error: string }>()
);

export const toggleTaskCompletion = createAction(
  '[Task] Toggle Task Completion',
  props<{ id: string }>()
);
export const toggleTaskCompletionSuccess = createAction(
  '[Task] Toggle Task Completion Success',
  props<{ task: Task }>()
);
export const toggleTaskCompletionFailure = createAction(
  '[Task] Toggle Task Completion Failure',
  props<{ error: string }>()
);

export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ id: string }>()
);
export const deleteTaskSuccess = createAction(
  '[Task] Delete Task Success',
  props<{ id: string }>()
);
export const deleteTaskFailure = createAction(
  '[Task] Delete Task Failure',
  props<{ error: string }>()
);
