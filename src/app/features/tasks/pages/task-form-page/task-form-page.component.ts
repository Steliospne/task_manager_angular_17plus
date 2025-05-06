import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../shared/models/task.model';
import { addTask } from '../../../../state/tasks/task.actions';

@Component({
  selector: 'app-task-form-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="task-form-page">
      <header class="page-header">
        <h1>Create New Task</h1>
      </header>

      <form [formGroup]="taskForm" (ngSubmit)="onSubmit()" class="task-form">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            id="title"
            formControlName="title"
            class="form-control"
            [ngClass]="{ invalid: isFieldInvalid('title') }"
          />
          <div *ngIf="isFieldInvalid('title')" class="error-message">
            Title is required
          </div>
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            formControlName="description"
            class="form-control"
            rows="4"
            [ngClass]="{ invalid: isFieldInvalid('description') }"
          ></textarea>
          <div *ngIf="isFieldInvalid('description')" class="error-message">
            Description is required
          </div>
        </div>

        <div class="form-group">
          <label for="priority">Priority</label>
          <select id="priority" formControlName="priority" class="form-control">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-cancel" (click)="onCancel()">
            Cancel
          </button>
          <button
            type="submit"
            class="btn-submit"
            [disabled]="taskForm.invalid"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .task-form-page {
        max-width: 600px;
        margin: 0 auto;
      }

      .page-header {
        margin-bottom: 2rem;
      }

      .task-form {
        background-color: white;
        border-radius: 8px;
        padding: 2rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .form-group {
        margin-bottom: 1.5rem;
      }

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
      }

      .form-control {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1rem;
        transition: border-color 0.2s;
      }

      .form-control:focus {
        outline: none;
        border-color: #3f51b5;
      }

      .form-control.invalid {
        border-color: #f44336;
      }

      .error-message {
        color: #f44336;
        font-size: 0.875rem;
        margin-top: 0.25rem;
      }

      .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 2rem;
      }

      .btn-cancel {
        padding: 0.75rem 1.5rem;
        background-color: transparent;
        border: 1px solid #ccc;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
      }

      .btn-submit {
        padding: 0.75rem 1.5rem;
        background-color: #3f51b5;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
        transition: background-color 0.2s;
      }

      .btn-submit:hover {
        background-color: #303f9f;
      }

      .btn-submit:disabled {
        background-color: #c5cae9;
        cursor: not-allowed;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormPageComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      priority: ['medium'],
      completed: [false],
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.taskForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.store.dispatch(addTask({ task: this.taskForm.value }));
      this.router.navigate(['/tasks']);
    } else {
      this.markFormGroupTouched(this.taskForm);
    }
  }

  onCancel(): void {
    this.router.navigate(['/tasks']);
  }

  // Helper method to mark all controls as touched
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if ((control as FormGroup).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}
