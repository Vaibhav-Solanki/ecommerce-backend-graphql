export const name = 'addresses'

export const auth = true

export async function resolver (parent, args, contextValue) {
  const { context, user } = contextValue

  const { dal } = context
  const repo = await dal.getRepo('addresses')

  return await repo.findAddressByCustomerId(user.identity.id)
}
