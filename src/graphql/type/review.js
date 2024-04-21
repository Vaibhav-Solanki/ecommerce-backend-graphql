export const name = 'Review'

export const resolver = {
  async product (parent, args, contextValue) {
    const { dal } = contextValue.context

    const repo = await dal.getRepo('products')
    if (parent.product_id) return await repo.findById(parent.product_id)
    return null
  },
  async customer_name (parent, args, contextValue) {
    const { dal } = contextValue.context

    const repo = await dal.getRepo('customers')
    const customer = await repo.findById(parent.customer_id)
    return customer.name
  }
}
