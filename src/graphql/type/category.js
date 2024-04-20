export const name = 'Category'

export const resolver = {
  async parent_category (parent, args, contextValue) {
    const { dal } = contextValue.context

    const repo = await dal.getRepo('categories')
    if (parent?.parent_category_id) return await repo.findById(parent.parent_category_id)
    return null
  },
  async sub_category (parent, args, contextValue) {
    if (parent?.level === 3) return []

    const { dal } = contextValue.context

    const repo = await dal.getRepo('categories')
    return await repo.findGroup({ parent_category_id: parent.id })
  }
}
