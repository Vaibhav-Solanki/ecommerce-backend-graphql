export const name = 'createAddress'

export const auth = true
export async function resolver (parent, args, contextValue, info) {
  const { context, user } = contextValue

  const { dal } = context
  const repo = await dal.getRepo('addresses')

  args.customer_id = user.identity.id

  return await repo.insert(args)
}
