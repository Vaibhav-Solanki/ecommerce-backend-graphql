export const name = 'order'

export const auth = true

export async function resolver (parent, args, contextValue) {
  const { id } = args

  const { dal } = contextValue.context
  const repo = await dal.getRepo('orders')

  return await repo.findById(id)
}
