import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator } from '#validators/login'
import { CreatUserValidator } from '#validators/user'
import ErrorService from '#services/error_service'
import { SuccessService } from '#services/success_service'
import User from '#models/user'
import TokenService from '#services/token_service'

export default class AuthController {
  // 🔹 Register new user
  public async register(ctx: HttpContext) {
    try {
      const payload = await ctx.request.validateUsing(CreatUserValidator)
      const user = await User.create(payload)
      const tokenData = await TokenService.create(user)

      return SuccessService.send(ctx, 'REGISTER_SUCCESS', {
        user: user.serialize(),
        ...tokenData,
      })
    } catch (error) {
      return ErrorService.handleError(ctx, error)
    }
  }

  // 🔹 Login user
  public async login(ctx: HttpContext) {
    try {
      const payload = await ctx.request.validateUsing(loginValidator)
      const user = await User.verifyCredentials(payload.email, payload.password)
      const tokenData = await TokenService.create(user)

      return SuccessService.send(ctx, 'LOGIN_SUCCESS', {
        user: user.serialize(),
        ...tokenData,
      })
    } catch (error) {
      return ErrorService.handleError(ctx, error)
    }
  }

  // 🔹 Logout user
  public async logout(ctx: HttpContext) {
    try {
      const api = ctx.auth.use('api')

      if (!api.isAuthenticated) {
        return SuccessService.send(ctx, 'NO_ACTIVE_SESSION')
      }

      const token = api.user!.currentAccessToken
      if (token) {
        await TokenService.delete(ctx.auth.user!, token.identifier)
      }

      return SuccessService.send(ctx, 'LOGOUT_SUCCESS')
    } catch (error) {
      return ErrorService.handleError(ctx, error)
    }
  }

  // 🔹 Current logged-in user
  public async me(ctx: HttpContext) {
    try {
      const user = ctx.auth.use('api').user

      if (!user) {
        return ErrorService.handleError(ctx, 'E_UNAUTHORIZED_ACCESS')
      }

      return SuccessService.send(ctx, 'USER_RETRIEVED', user.serialize())
    } catch (error) {
      return ErrorService.handleError(ctx, error)
    }
  }
}
