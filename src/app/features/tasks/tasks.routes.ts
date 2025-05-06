import { Routes } from '@angular/router';

export const TASKS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/task-list-page/task-list-page.component').then(
        (m) => m.TaskListPageComponent
      ),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./pages/task-form-page/task-form-page.component').then(
        (m) => m.TaskFormPageComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/task-detail-page/task-detail-page.component').then(
        (m) => m.TaskDetailPageComponent
      ),
  },
];
