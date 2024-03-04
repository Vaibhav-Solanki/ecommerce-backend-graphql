import 'dotenv/config';

export const db = {
    client: 'pg',
    connection: {
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        database: process.env.PG_DB,
        user: process.env.PG_USER,
        password: process.env.PG_PASS
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        directory: './src/database/migrations',
        tableName: 'knex_migrations' // Just use one of the properties, either table_name or tableName
    }
};

export const configCateKey = process.env.CATE_KEY;
