import BaseModel from './base.js'

class Address extends BaseModel {
  static get tableName () {
    return 'addresses'
  }

  static get idColumn () {
    return 'id'
  }

  static get relationMappings () {
    const Customer = this.getModel('customers')
    return {
      customer: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Customer,
        join: {
          from: 'addresses.customer_id',
          to: 'customers.id'
        }
      }
    }
  }

  static get jsonSchema () {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        customer_id: { type: 'integer' },
        address_line1: { type: 'string' },
        address_line2: { type: 'string' },
        city: { type: 'string' },
        state: { type: 'string' },
        country: { type: 'string' },
        postal_code: { type: 'string' }
      }
    }
  }
}

export default Address
