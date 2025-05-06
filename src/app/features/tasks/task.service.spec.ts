import { TestBed } from "@angular/core/testing"
import { TaskService } from "../../core/services/task.service"
import { firstValueFrom } from "rxjs"
import { jest } from "@jest/globals"

describe("TaskService", () => {
  let service: TaskService
  let localStorageSpy: jest.SpyInstance

  beforeEach(() => {
    // Mock localStorage
    const mockLocalStorage: Record<string, string> = {}
    localStorageSpy = jest
      .spyOn(Storage.prototype, "getItem")
      .mockImplementation((key: string) => mockLocalStorage[key] || null)
    jest.spyOn(Storage.prototype, "setItem").mockImplementation((key: string, value: string) => {
      mockLocalStorage[key] = value
    })

    TestBed.configureTestingModule({
      providers: [TaskService],
    })
    service = TestBed.inject(TaskService)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  it("should initialize with sample data if localStorage is empty", () => {
    expect(localStorageSpy).toHaveBeenCalledWith("tasks")
  })

  it("should add a task", async () => {
    const newTask = {
      title: "Test Task",
      description: "Test Description",
      completed: false,
      priority: "medium" as const,
    }

    const task = await firstValueFrom(service.addTask(newTask))

    expect(task).toEqual({
      ...newTask,
      id: expect.any(String),
      createdAt: expect.any(Date),
    })
  })

  it("should toggle task completion", async () => {
    // First add a task
    const newTask = {
      title: "Test Task",
      description: "Test Description",
      completed: false,
      priority: "medium" as const,
    }

    const addedTask = await firstValueFrom(service.addTask(newTask))

    // Then toggle its completion
    const updatedTask = await firstValueFrom(service.toggleTaskCompletion(addedTask.id))

    expect(updatedTask.completed).toBe(true)
  })

  it("should delete a task", async () => {
    // First add a task
    const newTask = {
      title: "Test Task",
      description: "Test Description",
      completed: false,
      priority: "medium" as const,
    }

    const addedTask = await firstValueFrom(service.addTask(newTask))

    // Then delete it
    const deletedId = await firstValueFrom(service.deleteTask(addedTask.id))

    expect(deletedId).toBe(addedTask.id)

    // Verify it's gone
    const tasks = await firstValueFrom(service.getTasks())
    expect(tasks.find((t) => t.id === addedTask.id)).toBeUndefined()
  })
})
