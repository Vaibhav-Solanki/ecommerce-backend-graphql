export const name = 'updateAddress'

export const auth = true
export async function resolver (parent, args, contextValue, info) {
  const { context } = contextValue

  const { dal } = context
  const repo = await dal.getRepo('addresses')

  const { id } = args

  return await repo.update({ id }, args)
}
