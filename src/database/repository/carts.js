import Base from './base.js'

class CartRepo extends Base {
  async findCartByCustomer (customerId) {
    return await this.model.query().select('*').where('customer_id', customerId)
  }
}

export default CartRepo
