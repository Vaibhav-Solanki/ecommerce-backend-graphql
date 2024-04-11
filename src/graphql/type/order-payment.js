export const name = 'OrderPayment'

export const resolver = {
  async order (parent, args, contextValue) {
    const { dal } = contextValue.context

    const repo = await dal.getRepo('orders')
    if (parent.order_id) return await repo.findById(parent.order_id)
    return null
  }
}
