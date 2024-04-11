export const name = 'Order'

export const resolver = {
  async customer (parent, args, contextValue) {
    const { dal } = contextValue.context

    const repo = await dal.getRepo('customers')
    return await repo.findById(parent.customer_id)
  },
  async order_items (parent, args, contextValue) {
    const { dal } = contextValue.context

    const repo = await dal.getRepo('order_items')
    return await repo.findOrderItems(parent.id)
  },
  async shipping_address (parent, args, contextValue) {
    const { dal } = contextValue.context

    const repo = await dal.getRepo('addresses')
    if (parent.shipping_address_id) return await repo.findById(parent.shipping_address_id)
    return []
  },
  async payment_status (parent, args, contextValue) {
    const { dal } = contextValue.context

    const model = await dal.getModel('orders')
    return model.paymentStatusMap[parent.payment_status]
  }
}
