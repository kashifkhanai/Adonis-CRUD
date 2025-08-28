import User from '#models/user'
import { CreatUserInterface, UpdateUserInterface } from '#validators/user'

// get all users
export const listing = async () => {
  try {
    return await User.query()
  } catch (error: any) {
    throw new Error(`Error retrieving users: ${error.message}`)
  }
}
// create new user
export const createUser = async (payload: CreatUserInterface) => {
  try {
    const user = await User.create(payload)
    return user
  } catch (error: any) {
    throw new Error(`Error creating user: ${error.message}`)
  }
}
// get user by id
export const getUserById = async (id: number) => {
  try {
    const user = await User.find(id)
    if (!user) throw new Error('User not found')
    return user
  } catch (error: any) {
    throw new Error(`Error retrieving user: ${error.message}`)
  }
}
// update user
export const updateUser = async (id: number, payload: UpdateUserInterface) => {
  try {
    const user = await getUserById(id)

    return await user.merge(payload).save()
  } catch (error: any) {
    throw new Error(`Error updating user: ${error.message}`)
  }
}
//
export const deleteUser = async (id: number) => {
  try {
    const user = await getUserById(id)
    await user.delete()
  } catch (error: any) {
    throw new Error(`Error deleting user: ${error.message}`)
  }
}
