import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskItemComponent } from './task-item.component';
import { Task } from '../../../../shared/models/task.model';
import { jest } from '@jest/globals';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;

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
      imports: [TaskItemComponent, RouterTestingModule],
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
    // Update the task to be completed
    component.task = { ...mockTask, completed: true };
    fixture.detectChanges();

    const taskItem = fixture.debugElement.query(
      By.css('.task-item')
    ).nativeElement;
    expect(taskItem).toContain('completed');
  });

  it('should hide description when compact mode is enabled', () => {
    // First check description is visible by default
    let descriptionElement = fixture.debugElement.query(
      By.css('.task-description')
    );
    expect(descriptionElement).toBeTruthy();

    // Enable compact mode
    component.compact = true;
    fixture.detectChanges();

    // Check description is now hidden
    descriptionElement = fixture.debugElement.query(
      By.css('.task-description')
    );
    expect(descriptionElement).toBeFalsy();
  });
});
