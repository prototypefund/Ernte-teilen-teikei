/* eslint-disable import/no-extraneous-dependencies */
import dotenv from 'dotenv'
import path from 'path'
import knexDbManager from 'knex-db-manager'
import { parse } from 'pg-connection-string'
import pino from 'pino'

import knexfile from './knexfile'

const log = pino()

dotenv.config({ path: path.resolve(__dirname, '..', '.env') })

const { test } = knexfile

const config = {
  knex: { ...test, connection: parse(test.connection) },
  dbManager: {
    superUser: process.env.DATABASE_ROOT_USER,
    superPassword: process.env.DATABASE_ROOT_PASSWORD
  }
}

const dbManager = knexDbManager.databaseManagerFactory(config)

export const initializeTestDatabase = async () => {
  log.info('preparing database', config.knex.connection.database)
  log.info('creating database')
  await dbManager.createDb()
  log.info('creating db owner')
  await dbManager.createDbOwnerIfNotExist()
  log.info('migrating')
  await dbManager.migrateDb()
  log.info('seeding')
  await dbManager.populateDb(path.resolve(__dirname, 'seeds', '*.js'))
  log.info('done')
  await dbManager.close()
}

export const dropTestDatabase = async () => {
  log.info('dropping')
  await dbManager.dropDb()
  log.info('done')
  await dbManager.close()
}

export const truncateTestDatabase = async () => {
  await dbManager.truncateDb([
    'users',
    'users_roles',
    'roles',
    'products',
    'goals',
    'knex_migrations',
    'knex_migrations_lock'
  ])
  // keep intial seed users
  await dbManager
    .knexInstance()('users')
    .where('id', '>', 3)
    .delete()
  await dbManager
    .knexInstance()('users_roles')
    .where('user_id', '>', 3)
    .delete()
  await dbManager.close()
}

switch (process.argv[2]) {
  case 'init':
    initializeTestDatabase()
    break
  case 'drop':
    dropTestDatabase()
    break
  default:
    log.info('argument required: drop or init')
}
