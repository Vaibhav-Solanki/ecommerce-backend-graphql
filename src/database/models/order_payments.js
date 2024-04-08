import BaseModel from './base.js'

class OrderPayment extends BaseModel {
  static get tableName () {
    return 'order_payments'
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
        amount: { type: 'number' },
        payment_date: { type: 'string', format: 'date-time' },
        payment_status: { type: 'string' },
        payment_method: { type: 'string' }
      }
    }
  }

  static get relationMappings () {
    const Order = this.getModel('orders')
    return {
      order: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Order,
        join: {
          from: 'order_payments.order_id',
          to: 'orders.id'
        }
      }
    }
  }
}

export default OrderPayment
