export const name = 'Cart'

export const resolver = {
  async customer (parent, args, contextValue) {
    const { dal } = contextValue.context

    const repo = await dal.getRepo('customers')
    return await repo.findById(parent.customer_id)
  }
}
