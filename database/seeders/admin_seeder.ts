import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class AdminSeeder extends BaseSeeder {
  async run() {
    await User.create({
      fullName: 'Super Admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: 1,
    })
  }
}
