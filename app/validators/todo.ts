// app/validators/todo.ts
import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'
import { existsInDb } from '#helpers/db_value_finder'

// validator for creating new todo
export const CreateTodoValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(255),
    description: vine.string().trim().optional(),
    userId: vine.number().exists(existsInDb('users', 'id')),
  })
)
export type CreateTodoInterface = Infer<typeof CreateTodoValidator>

// validator for updating existing todo
export const UpdateTodoValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(255).optional(),
    description: vine.string().trim().optional(),
    userId: vine.number().exists(existsInDb('users', 'id')).optional(),
  })
)
export type UpdateTodoInterface = Infer<typeof UpdateTodoValidator>
