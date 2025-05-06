import { Component, type OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { AppState, Task } from '../../../../shared/models/task.model';
import { selectAllTasks } from '../../../../state/tasks/task.selectors';
import {
  loadTasks,
  deleteTask,
  toggleTaskCompletion,
} from '../../../../state/tasks/task.actions';

@Component({
  selector: 'app-task-detail-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="task-detail-page" *ngIf="task$ | async as task">
      <header class="page-header">
        <h1>Task Details</h1>
        <div class="header-actions">
          <button class="btn-back" (click)="onBack()">Back to Tasks</button>
        </div>
      </header>

      <div class="task-detail-card">
        <div class="task-header">
          <div class="task-status" [ngClass]="{ completed: task.completed }">
            {{ task.completed ? 'Completed' : 'Pending' }}
          </div>
          <div class="task-priority" [ngClass]="'priority-' + task.priority">
            {{ task.priority }}
          </div>
        </div>

        <h2 class="task-title">{{ task.title }}</h2>

        <div class="task-meta">
          <div class="task-date">
            Created: {{ task.createdAt | date : 'medium' }}
          </div>
        </div>

        <div class="task-description">
          <p>{{ task.description }}</p>
        </div>

        <div class="task-actions">
          <button class="btn-toggle" (click)="onToggleComplete(task.id)">
            Mark as {{ task.completed ? 'Incomplete' : 'Complete' }}
          </button>
          <button class="btn-delete" (click)="onDelete(task.id)">
            Delete Task
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .task-detail-page {
        max-width: 800px;
        margin: 0 auto;
      }

      .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
      }

      .btn-back {
        padding: 0.5rem 1rem;
        background-color: transparent;
        border: 1px solid #ccc;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
      }

      .task-detail-card {
        background-color: white;
        border-radius: 8px;
        padding: 2rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .task-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
      }

      .task-status {
        font-size: 0.875rem;
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        background-color: #ffebee;
        color: #c62828;
      }

      .task-status.completed {
        background-color: #e8f5e9;
        color: #2e7d32;
      }

      .task-priority {
        font-size: 0.875rem;
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        text-transform: uppercase;
        font-weight: 600;
      }

      .priority-high {
        background-color: #ffebee;
        color: #c62828;
      }

      .priority-medium {
        background-color: #fff8e1;
        color: #ff8f00;
      }

      .priority-low {
        background-color: #e8f5e9;
        color: #2e7d32;
      }

      .task-title {
        font-size: 1.5rem;
        margin-bottom: 1rem;
      }

      .task-meta {
        font-size: 0.875rem;
        color: #666;
        margin-bottom: 1.5rem;
      }

      .task-description {
        margin-bottom: 2rem;
        line-height: 1.6;
      }

      .task-actions {
        display: flex;
        gap: 1rem;
        border-top: 1px solid #eee;
        padding-top: 1.5rem;
      }

      .btn-toggle {
        padding: 0.75rem 1.5rem;
        background-color: #3f51b5;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
        transition: background-color 0.2s;
      }

      .btn-toggle:hover {
        background-color: #303f9f;
      }

      .btn-delete {
        padding: 0.75rem 1.5rem;
        background-color: #f44336;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
        transition: background-color 0.2s;
      }

      .btn-delete:hover {
        background-color: #d32f2f;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailPageComponent implements OnInit {
  task$!: Observable<Task>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadTasks());

    this.task$ = this.route.paramMap.pipe(
      map((params) => params.get('id')),
      filter((id) => !!id),
      switchMap((id) =>
        this.store
          .select(selectAllTasks)
          .pipe(map((tasks) => tasks.find((task) => task.id === id)))
      ),
      filter((task): task is Task => !!task)
    );
  }

  onToggleComplete(id: string): void {
    this.store.dispatch(toggleTaskCompletion({ id }));
  }

  onDelete(id: string): void {
    this.store.dispatch(deleteTask({ id }));
    this.router.navigate(['/tasks']);
  }

  onBack(): void {
    this.router.navigate(['/tasks']);
  }
}
