import 'dotenv/config'

export const db = {
  client: 'pg',
  connection: process.env.POSTGRES_URL,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: './src/database/migrations',
    tableName: 'knex_migrations' // Just use one of the properties, either table_name or tableName
  }
}

export const configCateKey = process.env.CATE_KEY

export const redisUrl = process.env.REDIS_URL

export const imageKitConfig = {
  publicKey: 'public_NTkBcm/8Jg5OAKaVWJ9lsbwApIE=',
  privateKey: process.env.IMAGEKITKEY,
  urlEndpoint: 'https://ik.imagekit.io/itsVaibhav'
}
