import Base from './base.js'

class CartRepo extends Base {
  async addToCart (customerId, productId, quantity) {
    const cartItem = await this.findOne({ customer_id: customerId, product_id: productId })

    if (cartItem) return await this.updateAndFetch(cartItem, { quantity })
    return await this.insert({
      customer_id: customerId,
      product_id: productId,
      quantity
    })
  }
}

export default CartRepo
