import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AppState, Task } from '../../../../shared/models/task.model';
import {
  selectAllTasks,
  selectTasksLoading,
} from '../../../../state/tasks/task.selectors';
import { loadTasks } from '../../../../state/tasks/task.actions';
import { TaskListComponent } from '../../components/task-list/task-list.component';

@Component({
  selector: 'app-task-list-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, TaskListComponent],
  template: `
    <div class="task-list-page">
      <header class="page-header">
        <h1>Tasks</h1>
        <a routerLink="/tasks/new" class="new-task-btn">New Task</a>
      </header>

      <div class="filters">
        <div class="filter-group">
          <label for="filter">Filter:</label>
          <select
            id="filter"
            [formControl]="filterControl"
            class="filter-select"
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="priority">Priority:</label>
          <select
            id="priority"
            [formControl]="priorityControl"
            class="filter-select"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      <app-task-list
        [tasks]="filteredTasks$ | async"
        [loading]="(loading$ | async) ?? false"
      >
      </app-task-list>
    </div>
  `,
  styles: [
    `
      .task-list-page {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .new-task-btn {
        background-color: #3f51b5;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        text-decoration: none;
        font-weight: 500;
        transition: background-color 0.2s;
      }

      .new-task-btn:hover {
        background-color: #303f9f;
      }

      .filters {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }

      .filter-group {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .filter-select {
        padding: 0.5rem;
        border-radius: 4px;
        border: 1px solid #ccc;
        background-color: white;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListPageComponent implements OnInit {
  tasks$: Observable<Task[]>;
  loading$: Observable<boolean>;
  filteredTasks$: Observable<Task[]>;

  filterControl = new FormControl('all');
  priorityControl = new FormControl('all');

  constructor(private store: Store<AppState>) {
    this.tasks$ = this.store.select(selectAllTasks);
    this.loading$ = this.store.select(selectTasksLoading);

    // Combine the tasks with the filter controls to create filtered tasks
    this.filteredTasks$ = combineLatest([
      this.tasks$,
      this.filterControl.valueChanges.pipe(startWith('all')),
      this.priorityControl.valueChanges.pipe(startWith('all')),
    ]).pipe(
      map(([tasks, filterValue, priorityValue]) => {
        return tasks.filter((task) => {
          // Filter by completion status
          if (filterValue === 'completed' && !task.completed) return false;
          if (filterValue === 'incomplete' && task.completed) return false;

          // Filter by priority
          if (priorityValue !== 'all' && task.priority !== priorityValue)
            return false;

          return true;
        });
      })
    );
  }

  ngOnInit(): void {
    this.store.dispatch(loadTasks());
  }
}
