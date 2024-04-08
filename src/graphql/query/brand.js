export const name = 'brand'

export const auth = true

export async function resolver (parent, args, contextValue) {
  const { id } = args

  const { dal } = contextValue.context
  const repo = await dal.getRepo('brands')

  return await repo.findById(id)
}
