export const name = 'getUser'

export const auth = true

export async function resolver (parent, args, contextValue) {
  const { context, user } = contextValue
  const { dal } = context

  const repo = await dal.getRepo('customers')

  return await repo.findUserById(user.identity.id)
}
