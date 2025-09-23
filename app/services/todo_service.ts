import Todo from '#models/todo'
import { CreateTodoInterface, UpdateTodoInterface } from '#interfaces/todo_interfaces'
import paginationConfig from '#config/pagination'
import { getUserById } from './user_service.js'
// get all todos
export const listing = async (page: number = 1, limit?: number) => {
  try {
    const perPage = Math.min(limit || paginationConfig.defaultLimit, paginationConfig.maxLimit)
    return await Todo.query().paginate(page, perPage)
  } catch (error: any) {
    throw new Error(`Error retrieving todos: ${error.message}`)
  }
}
// get todos by user
export const listingByUser = async (userId: number, page: number = 1, limit?: number) => {
  const perPage = Math.min(limit || paginationConfig.defaultLimit, paginationConfig.maxLimit)
  return await Todo.query().where('user_id', userId).paginate(page, perPage)
}

// create new todo
export const createTodo = async (payload: CreateTodoInterface) => {
  try {
    return await Todo.create(payload)
  } catch (error: any) {
    throw new Error(`Error creating todo: ${error.message}`)
  }
}

// get todo by id
export const getTodoById = async (id: number) => {
  try {
    const todo = await Todo.find(id)
    if (!todo) throw new Error('Todo not found')
    return todo
  } catch (error: any) {
    throw new Error(`Error retrieving todo: ${error.message}`)
  }
}

// get user of a todo
export const getTodoUser = async (todoId: number) => {
  const todo = await Todo.find(todoId)
  if (!todo) {
    throw new Error('Todo not found')
  }

  const user = await getUserById(todo.userId)
  if (!user) {
    throw new Error('User not found for this todo')
  }

  return user // only user details, not todos
}

// get user with todos
export const getUserWithTodos = async (userId: number) => {
  const user = await getUserById(userId)

  if (!user) {
    throw new Error('User not found')
  }
  await user.load('todos')

  return user
}

// update todo
export const updateTodo = async (id: number, payload: UpdateTodoInterface) => {
  try {
    const todo = await getTodoById(id)
    return await todo.merge(payload).save()
  } catch (error: any) {
    throw new Error(`Error updating todo: ${error.message}`)
  }
}

// delete todo
export const deleteTodo = async (id: number) => {
  try {
    const todo = await getTodoById(id)
    await todo.delete()
  } catch (error: any) {
    throw new Error(`Error deleting todo: ${error.message}`)
  }
}
