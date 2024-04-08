import Base from './base.js'

class ReviewRepo extends Base {
  async findReviewByProductId (productId) {
    return await this.model.query().select('*').where('product_id', productId)
  }
}

export default ReviewRepo
