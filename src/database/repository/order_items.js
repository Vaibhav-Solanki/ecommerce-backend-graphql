import Base from './base.js'

class OrderItemRepo extends Base {
async findOrderItems(orderId){
    return await this.findGroup({order_id:orderId})
}
}

export default OrderItemRepo
