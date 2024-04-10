import BaseModel from './base.js'

class ProductImages extends BaseModel {
  static get tableName () {
    return 'product_images'
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
        url: { type: 'integer' },
        created_at: { type: 'date' }
      }
    }
  }

  static get relationMappings () {
    const Products = this.getModel('products')
    return {
      brand: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Products,
        join: {
          from: 'product_images.product_id',
          to: 'products.id'
        }
      }
    }
  }
}

export default ProductImages
