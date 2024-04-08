export const name = 'Customer'

export const resolver = {
  async addresses (parent, args, contextValue) {
    const { dal } = contextValue.context

    const repo = await dal.getRepo('addresses')
    return await repo.findAddressByCustomerId(parent.id)
  }
}
