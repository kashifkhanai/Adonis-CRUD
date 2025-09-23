// app/interfaces/user.ts
export interface CreateUserInterface {
  fullName: string
  email: string
  password: string
}

export interface UpdateUserInterface {
  fullName?: string
  email?: string
  password?: string
}
