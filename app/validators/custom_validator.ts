import db from '@adonisjs/lucid/services/db'

export function existsInDb(table: string, column: string) {
  return (value: any) => {
    return db
      .from(table)
      .where(column, value)
      .first()
      .then((row) => !!row)
  }
}
