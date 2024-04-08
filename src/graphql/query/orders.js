export const name = 'orders'

export const auth = true

export async function resolver (parent, args, contextValue) {
  const { context, user } = contextValue

  const { dal } = context
  const repo = await dal.getRepo('orders')

  return await repo.findOrdersByCustomerId(user.identity.id)
}
