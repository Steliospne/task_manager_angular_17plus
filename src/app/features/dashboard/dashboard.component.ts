import { Component, type OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../shared/models/task.model';
import {
  selectTaskStats,
  selectTasksByPriority,
} from '../../state/tasks/task.selectors';
import { loadTasks } from '../../state/tasks/task.actions';
import { TaskListComponent } from '../tasks/components/task-list/task-list.component';
import { TaskStatsComponent } from './components/task-stats/task-stats.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, TaskListComponent, TaskStatsComponent],
  template: `
    <div class="dashboard">
      <header class="dashboard-header">
        <h1>Dashboard</h1>
        <a routerLink="/tasks/new" class="new-task-btn">New Task</a>
      </header>

      <app-task-stats [stats]="taskStats$ | async"></app-task-stats>

      <section class="priority-section">
        <div class="section-header">
          <h2>High Priority Tasks</h2>
          <a routerLink="/tasks" class="view-all">View all tasks</a>
        </div>
        <app-task-list
          [tasks]="highPriorityTasks$ | async"
          [loading]="false"
          [compact]="true"
        >
        </app-task-list>
      </section>
    </div>
  `,
  styles: [
    `
      .dashboard {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      .dashboard-header {
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

      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      }

      .view-all {
        color: #3f51b5;
        text-decoration: none;
        font-weight: 500;
      }

      .priority-section {
        background-color: white;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  taskStats$: Observable<{
    total: number;
    completed: number;
    incomplete: number;
    completionRate: number;
  }>;
  highPriorityTasks$: Observable<any[]>;

  constructor(private store: Store<AppState>) {
    this.taskStats$ = this.store.select(selectTaskStats);
    this.highPriorityTasks$ = this.store.select(selectTasksByPriority('high'));
  }

  ngOnInit(): void {
    this.store.dispatch(loadTasks());
  }
}
