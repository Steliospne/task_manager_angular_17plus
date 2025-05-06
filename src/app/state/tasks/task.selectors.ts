import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from '../../shared/models/task.model';

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectAllTasks = createSelector(
  selectTaskState,
  (state: TaskState) => state.tasks
);

export const selectTasksLoading = createSelector(
  selectTaskState,
  (state: TaskState) => state.loading
);

export const selectTasksError = createSelector(
  selectTaskState,
  (state: TaskState) => state.error
);

export const selectCompletedTasks = createSelector(selectAllTasks, (tasks) =>
  tasks.filter((task) => task.completed)
);

export const selectIncompleteTasks = createSelector(selectAllTasks, (tasks) =>
  tasks.filter((task) => !task.completed)
);

export const selectTasksByPriority = (priority: string) =>
  createSelector(selectAllTasks, (tasks) =>
    tasks.filter((task) => task.priority === priority)
  );

export const selectTaskStats = createSelector(
  selectAllTasks,
  selectCompletedTasks,
  (allTasks, completedTasks) => ({
    total: allTasks.length,
    completed: completedTasks.length,
    incomplete: allTasks.length - completedTasks.length,
    completionRate: allTasks.length
      ? Math.round((completedTasks.length / allTasks.length) * 100)
      : 0,
  })
);
