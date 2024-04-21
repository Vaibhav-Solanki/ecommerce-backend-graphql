export const name = 'PaginateProducts'

export const resolver = {
  async products (parent, args = {}, contextValue) {
    const { dal } = contextValue.context

    const repo = await dal.getRepo('products')
    return await repo.findGroup(parent.args, args.page)
  }
}
