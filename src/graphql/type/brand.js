export const name = 'Brand'

export const resolver = {
  async products (parent, args, contextValue) {
    const { dal } = contextValue.context

    const repo = await dal.getRepo('products')
    if (parent.id) return await repo.findProductByBrand(parent.id)
    return null
  }
}
