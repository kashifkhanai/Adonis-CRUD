import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AdminMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    // Use the 'api' guard
    const api = ctx.auth.use('api')

    // Check if the user is authenticated
    if (!api.isAuthenticated) {
      return ctx.response.unauthorized({ message: 'You are not authroized for this!' })
    }

    // Check user exist
    const user = api.user
    if (!user) {
      return ctx.response.unauthorized({ message: 'You are not authroized for this!' })
    }

    // Check if the user is an admin
    if (user.role !== 'admin') {
      return ctx.response.unauthorized({ message: 'You are not authroized for this!' })
    }

    /**
     * Call next method in the pipeline and return its  output
     */
    const output = await next()
    return output
  }
}
