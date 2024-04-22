export const name = 'brands'

export const auth = false

export async function resolver (parent, args, contextValue) {
  const { dal } = contextValue.context

  const repo = await dal.getRepo('brands')

  return await repo.findAll()
}
