export const up = function (knex) {
  return knex.schema
    .createTable('files', function (table) {
      table.increments('id').primary()
      table.integer('customer_id').unsigned().references('id').inTable('customers')
      table.string('file')
      table.string('file_type')
      table.string('url')
      table.timestamp('created_at').defaultTo(knex.fn.now())
    })
    .catch(function (error) {
      console.error('Error creating tables:', error)
      throw error
    })
}

export const down = function (knex) {
  return knex.schema
    .dropTableIfExists('files')
    .catch(function (error) {
      console.error('Error dropping tables:', error)
      throw error
    })
}
