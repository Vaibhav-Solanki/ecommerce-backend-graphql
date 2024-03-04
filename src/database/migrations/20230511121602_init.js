/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
export function up (knex) {
  return knex.schema
    .createTable('users', function (table) {
      table.increments('id').notNullable().primary()
      table.string('username').notNullable().unique()
      table.string('full_name').notNullable();
      table.string('bio');
      table.integer('followers_count').unsigned().defaultTo(0);
      table.integer('following_count').unsigned().defaultTo(0);
      table.integer('post_count').unsigned().defaultTo(0);
      table.string('email').unique()
      table.string('password')
      table.string('user_type').notNullable()
      table.boolean('active')
      table
        .timestamp('created_at')
        .defaultTo(knex.fn.now())
        .notNullable()
      table
        .timestamp('updated_at')
        .defaultTo(knex.fn.now())
        .notNullable()
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
export function down (knex) {
  return knex.schema.dropTable('users')
}
