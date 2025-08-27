import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export const listing = async () => {
  try {
    return await User.query()
  } catch (error) {
    throw new Error(`Error retrieving users: ${error.message}`)
  }
}

export const createUser = async (payload: {
  fullName: string
  email: string
  password: string
}) => {
  try {
    const user = new User()
    user.fullName = payload.fullName
    user.email = payload.email
    user.password = await hash.make(payload.password)
    await user.save()
    return user
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`)
  }
}

export const getUserById = async (id: number) => {
  try {
    const user = await User.find(id)
    if (!user) throw new Error('User not found')
    return user
  } catch (error) {
    throw new Error(`Error retrieving user: ${error.message}`)
  }
}

export const updateUser = async (
  id: number,
  payload: Partial<{ fullName: string; email: string; password: string }>
) => {
  try {
    const user = await User.find(id)
    if (!user) throw new Error('User not found')

    if (payload.fullName) user.fullName = payload.fullName
    if (payload.email) user.email = payload.email
    if (payload.password) user.password = await hash.make(payload.password)

    await user.save()
    return user
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`)
  }
}

export const deleteUser = async (id: number) => {
  try {
    const user = await User.find(id)
    if (!user) throw new Error('User not found')
    await user.delete()
    return true
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`)
  }
}
