export const up = function (knex) {
  return knex.schema
    .createTable('fcm_notification', function (table) {
      table.increments('id').primary()
      table.integer('customer_id').unsigned().references('id').inTable('customers')
      table.string('fcm_token')
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
    .catch(function (error) {
      console.error('Error creating tables:', error)
      throw error
    })
}

export const down = function (knex) {
  return knex.schema
    .dropTableIfExists('fcm_notification')
    .catch(function (error) {
      console.error('Error dropping tables:', error)
      throw error
    })
}
