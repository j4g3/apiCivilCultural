import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'


export default class UserAuth extends BaseModel {
  public static table = 'users_auth'

  public static connection = 'pg'

  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public remember_me_token: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: UserAuth): Promise<void> {
    if(user.$dirty.password)
        user.password = await Hash.hash(user.password)
  }
}
