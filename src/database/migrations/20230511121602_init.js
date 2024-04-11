export const up = function (knex) {
  return knex.schema
    .createTable('brands', function (table) {
      table.increments('id').primary()
      table.string('name', 100).notNullable()
      table.text('description')
      table.string('website', 255)
      table.timestamp('created_at').defaultTo(knex.fn.now())
    })
    .then(function () {
      return knex.schema.createTable('categories', function (table) {
        table.increments('id').primary()
        table.string('name', 100).notNullable()
        table.text('description')
        table.integer('parent_category_id').unsigned().references('id').inTable('categories')
        table.timestamp('created_at').defaultTo(knex.fn.now())
      })
    })
    .then(function () {
      return knex.schema.createTable('products', function (table) {
        table.increments('id').primary()
        table.integer('brand_id').unsigned().references('id').inTable('brands')
        table.integer('category_id').unsigned().references('id').inTable('categories')
        table.string('name', 100).notNullable()
        table.text('description')
        table.decimal('price', 10, 2).notNullable()
        table.integer('stock_quantity').defaultTo(0).notNullable()
        table.integer('reserved_quantity').defaultTo(0).notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
      })
    })
    .then(function () {
      return knex.schema.createTable('product_images', function (table) {
        table.increments('id').primary()
        table.integer('product_id').unsigned().references('id').inTable('products')
        table.string('url')
        table.timestamp('created_at').defaultTo(knex.fn.now())
      })
    })
    .then(function () {
      return knex.schema.createTable('customers', function (table) {
        table.increments('id').primary()
        table.string('name', 50)
        table.string('picture')
        table.string('email', 100).unique().notNullable()
        table.string('uid', 100).unique().notNullable()
        table.string('password', 100)
        table.timestamp('created_at').defaultTo(knex.fn.now())
      })
    })
    .then(function () {
      return knex.schema.createTable('addresses', function (table) {
        table.increments('id').primary()
        table.integer('customer_id').unsigned().references('id').inTable('customers')
        table.string('address_line1', 255).notNullable()
        table.string('address_line2', 255)
        table.string('city', 100).notNullable()
        table.string('state', 100).notNullable()
        table.string('country', 100).notNullable()
        table.string('postal_code', 20).notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
      })
    })
    .then(function () {
      return knex.schema.createTable('orders', function (table) {
        table.increments('id').primary()
        table.integer('customer_id').unsigned().references('id').inTable('customers')
        table.timestamp('order_date').defaultTo(knex.fn.now())
        table.decimal('total_amount', 10, 2).notNullable()
        table.string('status', 20).notNullable()
        table.integer('shipping_address_id').unsigned().references('id').inTable('addresses')
        table.string('payment_method', 50)
        table.integer('payment_status').defaultTo(0)
        table.jsonb('value_distribution')
        table.timestamp('created_at').defaultTo(knex.fn.now())
      })
    })
    .then(function () {
      return knex.schema.createTable('order_items', function (table) {
        table.increments('id').primary()
        table.integer('order_id').unsigned().references('id').inTable('orders')
        table.integer('product_id').unsigned().references('id').inTable('products')
        table.integer('quantity').notNullable()
        table.decimal('unit_price', 10, 2).notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
      })
    })
    .then(function () {
      return knex.schema.createTable('carts', function (table) {
        table.increments('id').primary()
        table.integer('customer_id').unsigned().references('id').inTable('customers')
        table.integer('product_id').unsigned().references('id').inTable('products')
        table.integer('quantity').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
      })
    })
    .then(function () {
      return knex.schema.createTable('order_payments', function (table) {
        table.increments('id').primary()
        table.integer('order_id').unsigned().references('id').inTable('orders')
        table.decimal('amount', 10, 2).notNullable()
        table.timestamp('payment_date').defaultTo(knex.fn.now())
        table.string('payment_status', 20).notNullable()
        table.string('payment_method', 50)
        table.timestamp('created_at').defaultTo(knex.fn.now())
      })
    })
    .then(function () {
      return knex.schema.createTable('reviews', function (table) {
        table.increments('id').primary()
        table.integer('product_id').unsigned().references('id').inTable('products')
        table.integer('customer_id').unsigned().references('id').inTable('customers')
        table.integer('rating')
        table.text('review_text')
        table.timestamp('review_date').defaultTo(knex.fn.now())
      })
    })
    .catch(function (error) {
      console.error('Error creating tables:', error)
      throw error
    })
}

export const down = function (knex) {
  return knex.schema
    .dropTableIfExists('reviews')
    .then(function () {
      return knex.schema.dropTableIfExists('order_payments')
    })
    .then(function () {
      return knex.schema.dropTableIfExists('carts')
    })
    .then(function () {
      return knex.schema.dropTableIfExists('order_items')
    })
    .then(function () {
      return knex.schema.dropTableIfExists('orders')
    })
    .then(function () {
      return knex.schema.dropTableIfExists('addresses')
    })
    .then(function () {
      return knex.schema.dropTableIfExists('customers')
    })
    .then(function () {
      return knex.schema.dropTableIfExists('product_images')
    }).then(function () {
      return knex.schema.dropTableIfExists('products')
    })
    .then(function () {
      return knex.schema.dropTableIfExists('categories')
    })
    .then(function () {
      return knex.schema.dropTableIfExists('brands')
    })
    .catch(function (error) {
      console.error('Error dropping tables:', error)
      throw error
    })
}
