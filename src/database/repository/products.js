import Base from './base.js'

class ProductRepo extends Base {
  async getProducts (query) {
    return await this.model.query().modify(builder => {
      if (query.category_id) builder.where('category_id', query.category_id)
      if (query.brand_id) builder.where('category_id', query.category_id)
    })
  }
  async findProductByBrand (brand_id) {
    return await this.model.query().where('brand_id', brand_id)
  }
}

export default ProductRepo
