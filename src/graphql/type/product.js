export const name = 'Product'

export const resolver = {
  async category (parent, args, contextValue) {
    const { dal } = contextValue.context

    const repo = await dal.getRepo('categories')
    if (parent.category_id) return await repo.findById(parent.category_id)
    return null
  },
  async brand (parent, args, contextValue) {
    const { dal } = contextValue.context

    const repo = await dal.getRepo('brands')
    if (parent.brand_id) return await repo.findById(parent.brand_id)
    return null
  },
  async product_images (parent, args, contextValue) {
    const { dal } = contextValue.context

    const repo = await dal.getRepo('product_images')
    return await repo.findByProductId(parent.id)
  }
}
