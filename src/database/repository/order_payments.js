import Base from './base.js'

class OrderPaymentRepo extends Base {
  async findPaymentsByCustomerId (customerId) {
    return await this.model.query().select('*').where('customer_id', customerId)
  }

  async findByOrderId (orderId) {
    return await this.model.query().first('*').where('order_id', orderId)
  }
}

export default OrderPaymentRepo
