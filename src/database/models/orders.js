import BaseModel from './base.js'

class Order extends BaseModel {
  static get tableName () {
    return 'orders'
  }

  static get idColumn () {
    return 'id'
  }

  static paymentStatusMap = {
    0: 'Requested',
    1: 'Received',
    2: 'Pending'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        customer_id: { type: 'integer' },
        order_date: { type: 'string', format: 'date-time' },
        total_amount: { type: 'number' },
        status: { type: 'string' },
        shipping_address_id: { type: 'integer' },
        payment_method: { type: 'string' },
        value_distribution: { type: 'array' }
      }
    }
  }

static get relationMappings () {
    const Customer = this.getModel('customers')
    const Address = this.getModel('addresses')
    const OrderItem = this.getModel('order_items')
    return {
      customer: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Customer,
        join: {
          from: 'orders.customer_id',
          to: 'customers.id'
        }
      },
      shipping_address: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Address,
        join: {
          from: 'orders.shipping_address_id',
          to: 'addresses.id'
        }
      },
      order_items: {
        relation: BaseModel.HasManyRelation,
        modelClass: OrderItem,
        join: {
          from: 'orders.id',
          to: 'order_items.order_id'
        }
      }
    }
  }
}

export default Order
