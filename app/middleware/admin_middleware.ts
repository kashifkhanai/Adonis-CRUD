import { UserRole } from '#enums/role_enum'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AdminMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    // Use the 'api' guard
    const api = ctx.auth.use('api')

    // Check user exist
    const user = await api.getUserOrFail()

    // Check if the user is an admin
    if (user.role !== UserRole.ADMIN) {
      return ctx.response.unauthorized({ message: 'You are not authroized for this!' })
    }

    /**
     * Call next method in the pipeline and return its  output
     */
    const output = await next()
    return output
  }
}
