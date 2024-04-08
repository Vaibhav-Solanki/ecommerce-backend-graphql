export const name = 'cart'

export const auth = true

export async function resolver (parent, args, contextValue) {
  const { context, user } = contextValue
  const { dal } = context

  const repo = await dal.getRepo('carts')

  return await repo.findCartByCustomer(user.identity.id)
}
