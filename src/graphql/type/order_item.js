export const name = 'OrderItem'

export const resolver = {
  async product (parent, args, contextValue) {
    const { dal } = contextValue.context

    const repo = await dal.getRepo('products')
    if (parent.product_id) return await repo.findById(parent.product_id)
    return null
  },
  async order (parent, args, contextValue) {
    const { dal } = contextValue.context

    const repo = await dal.getRepo('orders')
    if (parent.order_id) return await repo.findById(parent.order_id)
    return null
  }
}
