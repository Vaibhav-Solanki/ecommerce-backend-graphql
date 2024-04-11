import BaseModel from './base.js'

class Review extends BaseModel {
  static get tableName () {
    return 'reviews'
  }

  static get idColumn () {
    return 'id'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        product_id: { type: 'integer' },
        customer_id: { type: 'integer' },
        rating: { type: 'integer', minimum: 1, maximum: 5 },
        review_text: { type: 'string' },
        review_date: { type: 'string', format: 'date-time' }
      },
      required: ['product_id', 'customer_id', 'rating']
    }
  }

  static get relationMappings () {
    const Product = this.getModel('products')
    const Customer = this.getModel('customers')
    return {
      product: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: 'reviews.product_id',
          to: 'products.id'
        }
      },
      customer: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Customer,
        join: {
          from: 'reviews.customer_id',
          to: 'customers.id'
        }
      }
    }
  }
}

export default Review
