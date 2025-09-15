// app/controllers/todo_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import {
  listing,
  createTodo,
  getTodoById,
  getTodoUser,
  getUserWithTodos,
  updateTodo,
  deleteTodo,
} from '#services/todo_service'
import { CreateTodoValidator, UpdateTodoValidator } from '#validators/todo'
import { TodoSuccessService } from '#services/todo_success_service'
import ErrorService from '#services/error_service'

export default class TodoController {
  // GET /todos?page=1&limit=10
  async index(ctx: HttpContext) {
    try {
      const page = Number(ctx.request.input('page', 1))
      const limit = Number(ctx.request.input('limit', 10))
      const todos = await listing(page, limit)
      return TodoSuccessService.send(ctx, 'TODOS_LISTED', todos)
    } catch (error) {
      return ErrorService.handleError(ctx, error)
    }
  }

  // POST /todos
  async store(ctx: HttpContext) {
    try {
      const payload = await ctx.request.validateUsing(CreateTodoValidator)
      const todo = await createTodo(payload)
      return TodoSuccessService.send(ctx, 'TODO_CREATED', todo)
    } catch (error) {
      return ErrorService.handleError(ctx, error)
    }
  }

  // GET /todos/:id
  async show(ctx: HttpContext) {
    try {
      const id = ctx.params.id
      const todo = await getTodoById(id)
      return TodoSuccessService.send(ctx, 'TODO_DETAIL', todo)
    } catch (error) {
      return ErrorService.handleError(ctx, error)
    }
  }

  // GET /todos/:id/user
  async showUser(ctx: HttpContext) {
    try {
      const id = ctx.params.id
      const user = await getTodoUser(id)
      return TodoSuccessService.send(ctx, 'TODO_USER', user)
    } catch (error) {
      return ErrorService.handleError(ctx, error)
    }
  }

  // GET /users/:id/todos
  async showUserWithTodos(ctx: HttpContext) {
    try {
      const id = ctx.params.id
      const user = await getUserWithTodos(id)
      return TodoSuccessService.send(ctx, 'USER_WITH_TODOS', user)
    } catch (error) {
      return ErrorService.handleError(ctx, error)
    }
  }

  // PUT /todos/:id
  async update(ctx: HttpContext) {
    try {
      const id = ctx.params.id
      const payload = await ctx.request.validateUsing(UpdateTodoValidator)
      const todo = await updateTodo(id, payload)
      return TodoSuccessService.send(ctx, 'TODO_UPDATED', todo)
    } catch (error) {
      return ErrorService.handleError(ctx, error)
    }
  }

  // DELETE /todos/:id
  async destroy(ctx: HttpContext) {
    try {
      const id = ctx.params.id
      await deleteTodo(id)
      return TodoSuccessService.send(ctx, 'TODO_DELETED')
    } catch (error) {
      return ErrorService.handleError(ctx, error)
    }
  }
}
