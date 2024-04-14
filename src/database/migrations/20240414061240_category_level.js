export const up = function (knex) {
  return knex.schema
    .alterTable('categories', function (table) {
      table.integer('level').defaultTo(1)
    })
    .catch(function (error) {
      console.error('Error creating tables:', error)
      throw error
    })
}

export const down = function (knex) {
  return knex.schema
    .alterTable('categories', function (table) {
      table.dropColumn('level')
    })
    .catch(function (error) {
      console.error('Error dropping tables:', error)
      throw error
    })
}
