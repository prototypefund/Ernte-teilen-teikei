import { BaseModel } from './base'

export default class Role extends BaseModel {
  static tableName = 'next_roles'

  static relationMappings = {
    users: {
      relation: BaseModel.ManyToManyRelation,
      modelClass: `${__dirname}/users`,
      join: {
        from: 'next_roles.id',
        through: {
          from: 'users_roles.role_id',
          to: 'users_roles.user_id'
        },
        to: 'next_users.id'
      }
    }
  }
}
