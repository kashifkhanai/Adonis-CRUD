// app/services/todo_success_service.ts
import { HttpContext } from '@adonisjs/core/http'

export class TodoSuccessService {
  private static messages = {
    TODO_CREATED: { message: 'Todo created successfully', Status: 201 },
    TODOS_LISTED: { message: 'Todos retrieved successfully', Status: 200 },
    TODO_DETAIL: { message: 'Todo detail retrieved successfully', Status: 200 },
    TODO_UPDATED: { message: 'Todo updated successfully', Status: 200 },
    TODO_DELETED: { message: 'Todo deleted successfully', Status: 200 },
    TODO_USER: { message: 'Todo owner retrieved successfully', Status: 200 },
    USER_WITH_TODOS: { message: 'User with todos retrieved successfully', Status: 200 },
  }

  /**
   * Send standardized success response
   * @param ctx Adonis HttpContext
   * @param key Key from predefined messages
   * @param data Optional payload
   * @param meta Optional metadata
   */
  public static send(
    ctx: HttpContext,
    key: keyof typeof TodoSuccessService.messages,
    data: any = null,
    meta: any = null
  ) {
    const res = this.messages[key]
    return ctx.response.status(res.Status).json({
      Status: true,
      message: res.message,
      data,
      ...(meta && { meta }),
    })
  }
}
