import ErrorService from '#services/error_service'
import { listing, createUser, getUserById, updateUser, deleteUser } from '#services/user_service'
import type { HttpContext } from '@adonisjs/core/http'
import { CreatUserValidator, UpdateUserValidator } from '#validators/user'
import { messages } from '@vinejs/vine/defaults'
export default class UsersController {
  //get all user.....................
  public async index(ctx: HttpContext) {
    try {
      const users = await listing()
      return users
    } catch (error) {
      return ErrorService.handleError(ctx, error)
    }
  }
  // getby id.........................
  public async show(ctx: HttpContext) {
    try {
      const user = await getUserById(ctx.params.id)
      return user
    } catch (error) {
      return ErrorService.handleError(ctx, error)
    }
  }
  // create new user.........................
  public async store(ctx: HttpContext) {
    try {
      const payload = await ctx.request.validateUsing(CreatUserValidator)
      const user = await createUser(payload)
      return ctx.response.created({ message: 'User created successfully', user })
    } catch (error) {
      return ErrorService.handleError(ctx, error)
    }
  }
  //update user........................
  public async update(ctx: HttpContext) {
    try {
      const payload = await ctx.request.validateUsing(UpdateUserValidator)
      const user = await updateUser(ctx.params.id, payload)
      return ctx.response.ok({ message: 'User updated successfully', user })
    } catch (error) {
      return ErrorService.handleError(ctx, error)
    }
  }
  // delet user..........................
  public async delete(ctx: HttpContext) {
    try {
      await deleteUser(ctx.params.id)
      return ctx.response.ok({ message: 'User delete Sucessfully' })
    } catch (error) {
      return ErrorService.handleError(ctx, error)
    }
  }
}
