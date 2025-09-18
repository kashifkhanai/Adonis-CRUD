import { HttpContext } from '@adonisjs/core/http'

export class SuccessService {
  // 🔹 Predefined success messages with HTTP status codes
  private static messages = {
    // ------------------------
    // 🔹 User Management
    // ------------------------
    USER_CREATED: { message: 'User created successfuly', Status: 201 },
    USER_LISTED: { message: 'User retrive successfuly', Status: 200 },
    USER_UPDATED: { message: 'User updated successfuly', Status: 200 },
    USER_DELETED: { message: 'User Deleted Successfuly', Status: 200 },

    // ------------------------
    // 🔹 Authentication
    // ------------------------
    REGISTER_SUCCESS: { message: 'User registered successfully', Status: 201 },
    LOGIN_SUCCESS: { message: 'User login successful', Status: 200 },
    LOGOUT_SUCCESS: { message: 'User logout successful', Status: 200 },
    NO_ACTIVE_SESSION: { message: 'No active session', Status: 200 },
    USER_RETRIEVED: { message: 'User retrieved successfully', Status: 200 },
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
    return ctx.response.status(res.Status).json({
      Status: true,
      massage: res.message,
      data,
      ...(meta && { meta }),
    })
  }
}
