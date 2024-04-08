export const name = 'categories'

export const auth = true

export async function resolver (parent, args, contextValue) {
  const { dal } = contextValue.context

  const repo = await dal.getRepo('categories')

  return await repo.findAll()
}
