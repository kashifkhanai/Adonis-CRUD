import User from '#models/user'

export default class TokenService {
  static async create(user: User, expiresIn: string = '30m') {
    const token = await User.accessTokens.create(user, { expiresIn } as any)

    return {
      type: 'bearer',
      token: token.value!.release(),
      expires_at: token.expiresAt,
    }
  }

  static async delete(user: User, identifier: string | number | bigint | BigInt) {
    if (identifier === null || identifier === undefined) {
      throw new Error('Token identifier is required')
    }

    await User.accessTokens.delete(user, String(identifier))
  }
}
