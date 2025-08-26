import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { CreatUserValidator, UpdateUserValidator } from '#validators/user'
import hash from '@adonisjs/core/services/hash'

export default class UsersController {
  //get all users..................................................
  async index({ response }: HttpContext) {
    const users = await User.all()
    return response.ok({ users })
  }
  //create new user................................................
  async store({ request, response }: HttpContext) {
    //validate request data
    const payload = await request.validateUsing(CreatUserValidator)
    //create new user
    const user = new User()
    user.fullName = payload.fullname
    user.email = payload.email
    //hash password before saving
    user.password = await hash.make(payload.password)
    await user.save()
    return response.created({ message: 'User created successfully', user })
  }
  //get single user by id..........................................
  async show({ params, response }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ message: 'User not found' })
    }
    return response.ok({ user })
  }
  //update user by id..............................................
  async update({ params, request, response }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ message: 'User not found' })
    }
    //validate request data
    const payload = await request.validateUsing(UpdateUserValidator)
    //update user details
    if (payload.fullname) {
      user.fullName = payload.fullname
    }
    if (payload.email) {
      user.email = payload.email
    }
    if (payload.password) {
      //hash password before saving
      user.password = await hash.make(payload.password)
    }
    await user.save()
    return response.ok({ message: 'User updated successfully', user })
  }
  //delete user by id..............................................
  async destroy({ params, response }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ message: 'User not found' })
    }
    await user.delete()
    return response.ok({ message: 'User deleted successfully' })
  }
}
