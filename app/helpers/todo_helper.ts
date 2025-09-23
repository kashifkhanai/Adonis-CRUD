import type { HttpContext } from '@adonisjs/core/http'
import type TodoModel from '#models/todo'
import ErrorService from '#services/error_service'

export const authorizeTodo = (ctx: HttpContext, todo: TodoModel) => {
  if (!todo) {
    return ErrorService.handleError(ctx, new Error('Todo not found'))
  }
  return true
}
