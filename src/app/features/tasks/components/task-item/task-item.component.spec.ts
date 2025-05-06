import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskItemComponent } from './task-item.component';
import { Task } from '../../../../shared/models/task.model';
import { jest } from '@jest/globals';
import { RouterModule } from '@angular/router';
import { TASKS_ROUTES } from '../../tasks.routes';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;

  const updateInputs = () => {
    const cdr = fixture.debugElement.injector.get(ChangeDetectorRef);
    cdr.markForCheck();
    fixture.detectChanges();
  };

  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
    priority: 'medium',
    createdAt: new Date(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskItemComponent, RouterModule.forRoot(TASKS_ROUTES)],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    component.task = mockTask;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display task title', () => {
    const titleElement = fixture.debugElement.query(By.css('.task-title h3'));
    expect(titleElement.nativeElement.textContent).toContain(mockTask.title);
  });

  it('should display task priority', () => {
    const priorityElement = fixture.debugElement.query(
      By.css('.task-priority')
    );
    expect(priorityElement.nativeElement.textContent.trim()).toBe(
      mockTask.priority
    );
    expect(priorityElement.nativeElement.classList).toContain(
      `priority-${mockTask.priority}`
    );
  });

  it('should emit toggleComplete event when checkbox is clicked', () => {
    const spy = jest.spyOn(component.toggleComplete, 'emit');
    const checkbox = fixture.debugElement.query(
      By.css('input[type="checkbox"]')
    ).nativeElement;

    checkbox.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(mockTask.id);
  });

  it('should emit delete event when delete button is clicked', () => {
    const spy = jest.spyOn(component.delete, 'emit');
    const deleteButton = fixture.debugElement.query(
      By.css('.task-action.delete')
    ).nativeElement;

    deleteButton.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(mockTask.id);
  });

  it('should apply completed class when task is completed', () => {
    component.task = { ...mockTask, completed: true };
    updateInputs();
    const taskItem = fixture.debugElement.query(
      By.css('.task-item')
    ).nativeElement;

    expect(taskItem.classList.contains('completed')).toBeTruthy();
  });

  it('should hide description when compact mode is enabled', () => {
    let descriptionElement = fixture.debugElement.query(
      By.css('.task-description')
    );
    expect(descriptionElement).toBeTruthy();

    component.compact = true;
    updateInputs();

    descriptionElement = fixture.debugElement.query(
      By.css('.task-description')
    )?.nativeElement;

    expect(descriptionElement).toBeUndefined();
  });
});
