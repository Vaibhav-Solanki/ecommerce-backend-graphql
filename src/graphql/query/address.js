export const name = 'address'

export const auth = false

export async function resolver (parent, args, contextValue) {
  const { id } = args

  const { dal } = contextValue.context
  const repo = await dal.getRepo('addresses')

  return await repo.findById(id)
}
