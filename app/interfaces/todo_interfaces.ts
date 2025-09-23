// app/interfaces/todo.ts
export interface CreateTodoInterface {
  title: string
  description?: string
  userId: number
}

export interface UpdateTodoInterface {
  title?: string
  description?: string
  userId?: number
}
