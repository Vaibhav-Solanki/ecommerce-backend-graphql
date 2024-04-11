export const name = 'updateCustomer'

export const auth = true
export async function resolver (parent, args, contextValue, info) {
  const { context, user } = contextValue

  const { dal } = context
  const repo = await dal.getRepo('customers')

  return await repo.updateAndFetch(user.identity, args)
}
