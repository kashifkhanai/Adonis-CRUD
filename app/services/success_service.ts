import { HttpContext } from '@adonisjs/core/http'

export class SuccessService {
  // 🔹 Predefined success messages with HTTP status codes
  private static messages = {
    // ------------------------
    // 🔹 User Management
    // ------------------------
    USER_CREATED: { message: 'User created successfuly', status: 201 },
    USER_LISTED: { message: 'User retrive successfuly', status: 200 },
    USER_UPDATED: { message: 'User updated successfuly', status: 200 },
    USER_DELETED: { message: 'User Deleted Successfuly', status: 200 },

    // ------------------------
    // 🔹 Authentication
    // ------------------------
    REGISTER_SUCCESS: { message: 'User registered successfully', status: 201 },
    LOGIN_SUCCESS: { message: 'User login successful', status: 200 },
    LOGOUT_SUCCESS: { message: 'User logout successful', status: 200 },
    NO_ACTIVE_SESSION: { message: 'No active session', status: 200 },
    USER_RETRIEVED: { message: 'User retrieved successfully', status: 200 },

    // ------------------------
    // 🔹 todos
    // ------------------------
    TODO_CREATED: { message: 'Todo created successfully', status: 201 },
    TODOS_LISTED: { message: 'Todos retrieved successfully', status: 200 },
    TODO_DETAIL: { message: 'Todo detail retrieved successfully', status: 200 },
    TODO_UPDATED: { message: 'Todo updated successfully', status: 200 },
    TODO_DELETED: { message: 'Todo deleted successfully', status: 200 },
    TODO_USER: { message: 'Todo owner retrieved successfully', status: 200 },
    USER_WITH_TODOS: { message: 'User with todos retrieved successfully', status: 200 },
    // ------------------------
    // 🔹 Admin Management
    // ------------------------
    ADMIN_CREATED: { message: 'Admin user created successfully', status: 201 },
    // ------------------------
  }

  /**
   *
   * @param ctx -Adonis HttpContext
   * @param key -Predefined key from messages
   * @param data -Optional payload
   */
  public static send(
    ctx: HttpContext,
    key: keyof typeof SuccessService.messages,
    data: any = null,
    meta: any = null
  ) {
    const res = this.messages[key]
    return ctx.response.status(res.status).json({
      status: true,
      message: res.message,
      data,
      ...(meta && { meta }),
    })
  }
}
