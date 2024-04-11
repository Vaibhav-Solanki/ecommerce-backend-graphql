import BaseModel from './base.js'

class Files extends BaseModel {
  static get tableName () {
    return 'files'
  }

  static get idColumn () {
    return 'id'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        customer_id: { type: 'integer' },
        file: { type: 'string' },
        file_type: { type: 'string' },
        url: { type: 'string' },
        created_at: { type: 'string', format: 'date-time' }
      }
    }
  }

  static get relationMappings () {
    const Customer = this.getModel('customers')
    return {
      customer: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Customer,
        join: {
          from: 'files.customer_id',
          to: 'customers.id'
        }
      }
    }
  }
}

export default Files
