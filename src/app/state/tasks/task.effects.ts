import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { TaskService } from '../../core/services/task.service';
import * as TaskActions from './task.actions';

@Injectable()
export class TaskEffects {
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      switchMap(() =>
        this.taskService.getTasks().pipe(
          map((tasks) => TaskActions.loadTasksSuccess({ tasks })),
          catchError((error) =>
            of(TaskActions.loadTasksFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.addTask),
      mergeMap(({ task }) =>
        this.taskService.addTask(task).pipe(
          map((newTask) => TaskActions.addTaskSuccess({ task: newTask })),
          catchError((error) =>
            of(TaskActions.addTaskFailure({ error: error.message }))
          )
        )
      )
    )
  );

  toggleTaskCompletion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.toggleTaskCompletion),
      mergeMap(({ id }) =>
        this.taskService.toggleTaskCompletion(id).pipe(
          map((task) => TaskActions.toggleTaskCompletionSuccess({ task })),
          catchError((error) =>
            of(
              TaskActions.toggleTaskCompletionFailure({ error: error.message })
            )
          )
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      mergeMap(({ id }) =>
        this.taskService.deleteTask(id).pipe(
          map(() => TaskActions.deleteTaskSuccess({ id })),
          catchError((error) =>
            of(TaskActions.deleteTaskFailure({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private taskService: TaskService) {}
}
