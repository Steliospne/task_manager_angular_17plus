export interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  priority: "low" | "medium" | "high"
  createdAt: Date
}

export interface TaskState {
  tasks: Task[]
  loading: boolean
  error: string | null
}

export interface AppState {
  tasks: TaskState
}
