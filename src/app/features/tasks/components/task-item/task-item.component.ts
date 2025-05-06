import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Task } from '../../../../shared/models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div
      class="task-item"
      [ngClass]="{ compact: compact, completed: task.completed }"
    >
      <div class="task-header">
        <div class="task-checkbox">
          <input
            type="checkbox"
            [checked]="task.completed"
            (change)="onToggleComplete()"
            id="task-{{ task.id }}"
          />
          <label for="task-{{ task.id }}" class="sr-only"
            >Mark as {{ task.completed ? 'incomplete' : 'complete' }}</label
          >
        </div>

        <div class="task-title">
          <h3>{{ task.title }}</h3>
        </div>

        <div class="task-priority" [ngClass]="'priority-' + task.priority">
          {{ task.priority }}
        </div>
      </div>

      <div *ngIf="!compact" class="task-description">
        <p>{{ task.description }}</p>
      </div>

      <div class="task-footer">
        <div class="task-date">
          {{ task.createdAt | date : 'mediumDate' }}
        </div>

        <div class="task-actions">
          <a
            *ngIf="!compact"
            [routerLink]="['/tasks', task.id]"
            class="task-action"
            >View</a
          >
          <button class="task-action delete" (click)="onDelete()">
            Delete
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .task-item {
        background-color: white;
        border-radius: 8px;
        padding: 1rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        transition: transform 0.2s, box-shadow 0.2s;
      }

      .task-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .task-item.compact {
        padding: 0.75rem;
        gap: 0.5rem;
      }

      .task-item.completed {
        background-color: #f9f9f9;
      }

      .task-header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .task-checkbox {
        flex-shrink: 0;
      }

      .task-title {
        flex-grow: 1;
        min-width: 0;
      }

      .task-title h3 {
        margin: 0;
        font-size: 1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .task-item.completed .task-title h3 {
        text-decoration: line-through;
        color: #666;
      }

      .task-priority {
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
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

      .task-description {
        color: #666;
        font-size: 0.875rem;
      }

      .task-description p {
        margin: 0;
      }

      .task-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.75rem;
        color: #666;
      }

      .task-actions {
        display: flex;
        gap: 0.5rem;
      }

      .task-action {
        background: none;
        border: none;
        color: #3f51b5;
        cursor: pointer;
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
        text-decoration: none;
        font-weight: 500;
      }

      .task-action.delete {
        color: #f44336;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Input() compact = false;
  @Output() toggleComplete = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  onToggleComplete(): void {
    this.toggleComplete.emit(this.task.id);
  }

  onDelete(): void {
    this.delete.emit(this.task.id);
  }
}
