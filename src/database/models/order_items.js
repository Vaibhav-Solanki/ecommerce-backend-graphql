import BaseModel from './base.js'

class OrderItem extends BaseModel {
  static get tableName () {
    return 'order_items'
  }

  static get idColumn () {
    return 'id'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        order_id: { type: 'integer' },
        product_id: { type: 'integer' },
        quantity: { type: 'integer' },
        unit_price: { type: 'number' },
        created_at: { type: 'string', format: 'date-time' }
      }
    }
  }

  static get relationMappings () {
    const Order = this.getModel('orders')
    const Product = this.getModel('products')
    return {
      order: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Order,
        join: {
          from: 'order_items.order_id',
          to: 'orders.id'
        }
      },
      product: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: 'order_items.product_id',
          to: 'products.id'
        }
      }
    }
  }
}

export default OrderItem
