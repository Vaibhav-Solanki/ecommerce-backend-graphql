export const name = 'Category'

export const resolver = {
  async parent_category (parent, args, contextValue) {
    const { dal } = contextValue.context

    const repo = await dal.getRepo('categories')
    if (parent.parent_category_id) return await repo.findById(parent.customer_id)
    return null
  }
}
