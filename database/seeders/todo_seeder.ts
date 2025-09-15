import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Todo from '#models/todo'
import User from '#models/user'

export default class TodoSeeder extends BaseSeeder {
  public async run() {
    // Fetch all users
    const users = await User.all()

    for (const user of users) {
      // 3 todos for each user
      for (let i = 1; i <= 3; i++) {
        await Todo.create({
          title: `Todo ${i} for ${user.fullName}`,
          isCompleted: false,
          userId: user.id,
        })
      }
    }

    console.log('Todos created successfully for all users!')
  }
}
