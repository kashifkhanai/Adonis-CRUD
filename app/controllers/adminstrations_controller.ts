import ErrorService from '#services/error_service'
import { createUser } from '#services/user_service'
import type { HttpContext } from '@adonisjs/core/http'
import { CreatUserValidator } from '#validators/user'
import { SuccessService } from '#services/success_service'
import { UserRole } from '#enums/role_enum'

export default class AdminController {
  // Create new admin (only admin can access this route via  middleware)
  public async create(ctx: HttpContext) {
    try {
      const payload = await ctx.request.validateUsing(CreatUserValidator)
      const adminUser = await createUser({
        ...payload,
        role: UserRole.ADMIN,
      } as any)

      return SuccessService.send(ctx, 'ADMIN_CREATED', adminUser)
    } catch (error) {
      return ErrorService.handleError(ctx, error)
    }
  }
}
