// validator for creating new user
import vine from '@vinejs/vine'

export const CreatUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(3).maxLength(255),
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().minLength(8).maxLength(180),
  })
)

// validator for updating existing user
export const UpdateUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(3).optional(),
    email: vine.string().email().optional(),
    password: vine.string().minLength(8).maxLength(180).optional(),
  })
)
