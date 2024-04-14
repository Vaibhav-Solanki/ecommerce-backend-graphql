export const name = 'categories'

export const auth = true

export async function resolver (parent, args, contextValue) {
  const { dal } = contextValue.context
  const { level } = args

  const repo = await dal.getRepo('categories')
  if (level) { return await repo.findGroup({ level }) }

  return await repo.findAll()
}
