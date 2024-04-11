import Base from './base.js'

class CartRepo extends Base {
  async findCartByCustomer (customerId) {
    return await this.model.query().select('*').where('customer_id', customerId)
  }

  async flushCartByCustomer (customerId) {
    return await this.model.query().where('customer_id', customerId).del()
  }

  async addToCart (customerId, productId, quantity) {
    const cartItem = await this.model.query().first('*').where({ customer_id: customerId, product_id: productId })

    if (cartItem) return await this.update({ id: cartItem.id }, { quantity })
    return await this.insert({
      customer_id: customerId,
      product_id: productId,
      quantity
    })
  }
}

export default CartRepo
