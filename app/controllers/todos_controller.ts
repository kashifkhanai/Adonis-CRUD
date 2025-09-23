// app/controllers/todo_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import {
  createTodo,
  getTodoById,
  getUserWithTodos,
  updateTodo,
  deleteTodo,
  listingByUser,
} from '#services/todo_service'
import { CreateTodoValidator, UpdateTodoValidator } from '#validators/todo'
import { SuccessService } from '#services/success_service'
import ErrorService from '#services/error_service'
import { authorizeTodo } from '#helpers/todo_helper'
import { getUserById } from '#services/user_service'

export default class TodoController {
  // GET /todos?page=1&limit=10
  async index(ctx: HttpContext) {
    try {
      const page = Number(ctx.request.input('page', 1))
      const limit = Number(ctx.request.input('limit', 10))
      const todosPaginator = await listingByUser(ctx.auth.user!.id, page, limit)
      return SuccessService.send(ctx, 'TODOS_LISTED', todosPaginator)
    } catch (error) {
      return ErrorService.handleError(ctx, error)
    }
  }

  // POST /todos
  async store(ctx: HttpContext) {
    try {
      const payload = await ctx.request.validateUsing(CreateTodoValidator)
      const todo = await createTodo({ ...payload, userId: ctx.auth.user!.id })
      return SuccessService.send(ctx, 'TODO_CREATED', todo)
    } catch (error) {
      return ErrorService.handleError(ctx, error)
    }
  }

  // GET /todos/:id
  async show(ctx: HttpContext) {
    try {
      const id = Number(ctx.params.id)
      const todo = await getTodoById(id)
      authorizeTodo(ctx, todo)

      return SuccessService.send(ctx, 'TODO_DETAIL', todo)
    } catch (error) {
      return ErrorService.handleError(ctx, error)
    }
  }

  // GET /todos/user
  async showUser(ctx: HttpContext) {
    try {
      const user = await getUserById(ctx.auth.user!.id)
      return SuccessService.send(ctx, 'TODO_USER', user)
    } catch (error) {
      return ErrorService.handleError(ctx, error)
    }
  }

  // GET /user-todos
  async showUserWithTodos(ctx: HttpContext) {
    try {
      const user = await getUserWithTodos(ctx.auth.user!.id)
      return SuccessService.send(ctx, 'USER_WITH_TODOS', user)
    } catch (error) {
      return ErrorService.handleError(ctx, error)
    }
  }

  // PUT /todos/:id
  async update(ctx: HttpContext) {
    try {
      const id = Number(ctx.params.id)
      const payload = await ctx.request.validateUsing(UpdateTodoValidator)
      const existingTodo = await getTodoById(id)
      authorizeTodo(ctx, existingTodo)
      const todo = await updateTodo(id, payload)
      return SuccessService.send(ctx, 'TODO_UPDATED', todo)
    } catch (error) {
      return ErrorService.handleError(ctx, error)
    }
  }

  // DELETE /todos/:id
  async destroy(ctx: HttpContext) {
    try {
      const id = Number(ctx.params.id)
      const todo = await getTodoById(id)
      authorizeTodo(ctx, todo)
      await deleteTodo(id)
      return SuccessService.send(ctx, 'TODO_DELETED')
    } catch (error) {
      return ErrorService.handleError(ctx, error)
    }
  }
}
