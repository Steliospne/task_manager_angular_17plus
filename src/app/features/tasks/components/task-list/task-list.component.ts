import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Task, AppState } from '../../../../shared/models/task.model';
import {
  deleteTask,
  toggleTaskCompletion,
} from '../../../../state/tasks/task.actions';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink, TaskItemComponent],
  template: `
    <div class="task-list-container">
      <div *ngIf="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading tasks...</p>
      </div>

      <div
        *ngIf="!loading && (!tasks || tasks.length === 0)"
        class="empty-state"
      >
        <p>No tasks found.</p>
        <a routerLink="/tasks/new" class="create-task-link"
          >Create a new task</a
        >
      </div>

      <div *ngIf="!loading && tasks && tasks.length > 0" class="tasks-grid">
        <app-task-item
          *ngFor="let task of tasks; trackBy: trackByTaskId"
          [task]="task"
          [compact]="compact"
          (toggleComplete)="onToggleComplete($event)"
          (delete)="onDelete($event)"
        >
        </app-task-item>
      </div>
    </div>
  `,
  styles: [
    `
      .task-list-container {
        width: 100%;
      }

      .loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem;
      }

      .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        border-top-color: #3f51b5;
        animation: spin 1s ease-in-out infinite;
        margin-bottom: 1rem;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      .empty-state {
        text-align: center;
        padding: 2rem;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .create-task-link {
        display: inline-block;
        margin-top: 0.5rem;
        color: #3f51b5;
        text-decoration: none;
        font-weight: 500;
      }

      .tasks-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  @Input() tasks: Task[] | null = null;
  @Input() loading = false;
  @Input() compact = false;

  constructor(private store: Store<AppState>) {}

  onToggleComplete(taskId: string): void {
    this.store.dispatch(toggleTaskCompletion({ id: taskId }));
  }

  onDelete(taskId: string): void {
    this.store.dispatch(deleteTask({ id: taskId }));
  }

  trackByTaskId(index: number, task: Task): string {
    return task.id;
  }
}
