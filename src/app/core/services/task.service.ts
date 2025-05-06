import { Injectable } from '@angular/core';
import { type Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Task } from '../../shared/models/task.model';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private localStorageKey = 'tasks';

  constructor() {
    // Initialize with sample data if empty
    if (!localStorage.getItem(this.localStorageKey)) {
      const sampleTasks: Task[] = [
        {
          id: uuid(),
          title: 'Learn Angular Standalone Components',
          description: 'Study the new standalone components in Angular',
          completed: true,
          priority: 'high',
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
        {
          id: uuid(),
          title: 'Implement NgRx Store',
          description: 'Add state management to the application',
          completed: false,
          priority: 'medium',
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        },
        {
          id: uuid(),
          title: 'Write Unit Tests',
          description: 'Create comprehensive tests for components',
          completed: false,
          priority: 'high',
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        },
      ];
      localStorage.setItem(this.localStorageKey, JSON.stringify(sampleTasks));
    }
  }

  getTasks(): Observable<Task[]> {
    // Simulate API call with delay
    return of(this.getTasksFromStorage()).pipe(
      delay(500),
      map((tasks) =>
        tasks.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      )
    );
  }

  addTask(task: Omit<Task, 'id' | 'createdAt'>): Observable<Task> {
    const newTask: Task = {
      ...task,
      id: uuid(),
      createdAt: new Date(),
    };

    const tasks = this.getTasksFromStorage();
    tasks.push(newTask);
    this.saveTasksToStorage(tasks);

    return of(newTask).pipe(delay(300));
  }

  toggleTaskCompletion(id: string): Observable<Task> {
    const tasks = this.getTasksFromStorage();
    const taskIndex = tasks.findIndex((t) => t.id === id);

    if (taskIndex === -1) {
      throw new Error('Task not found');
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      completed: !tasks[taskIndex].completed,
    };

    this.saveTasksToStorage(tasks);
    return of(tasks[taskIndex]).pipe(delay(300));
  }

  deleteTask(id: string): Observable<string> {
    const tasks = this.getTasksFromStorage();
    const filteredTasks = tasks.filter((t) => t.id !== id);

    this.saveTasksToStorage(filteredTasks);
    return of(id).pipe(delay(300));
  }

  private getTasksFromStorage(): Task[] {
    const tasksJson = localStorage.getItem(this.localStorageKey) || '[]';
    const tasks = JSON.parse(tasksJson) as Task[];
    // Convert string dates to Date objects
    return tasks.map((task) => ({
      ...task,
      createdAt: new Date(task.createdAt),
    }));
  }

  private saveTasksToStorage(tasks: Task[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
  }
}
