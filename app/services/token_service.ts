import User from '#models/user'
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'

export default class TokenService {
  static async create(user: User, expiresIn: string = '60m', name: string | null = null) {
    const token = await User.accessTokens.create(user, {
      abilities: ['*'],
    } as any)

    let expiresAt: Date | null = null
    if (expiresIn.endsWith('m')) {
      const minutes = Number.parseInt(expiresIn.replace('m', ''), 10)
      expiresAt = DateTime.now().plus({ minutes }).toJSDate()
    } else if (expiresIn.endsWith('h')) {
      const hours = Number.parseInt(expiresIn.replace('h', ''), 10)
      expiresAt = DateTime.now().plus({ hours }).toJSDate()
    } else if (expiresIn.endsWith('d')) {
      const days = Number.parseInt(expiresIn.replace('d', ''), 10)
      expiresAt = DateTime.now().plus({ days }).toJSDate()
    }

    await db.from('auth_access_tokens').where('id', String(token.identifier)).update({
      expires_at: expiresAt,
      name: name,
    })

    return {
      type: 'bearer',
      token: token.value!.release(),
      expires_at: expiresAt,
      name,
    }
  }
  static async delete(user: User, identifier: string | number | bigint | BigInt) {
    if (identifier === null || identifier === undefined) {
      throw new Error('Token identifier is required')
    }
    await User.accessTokens.delete(user, String(identifier))
  }
}
