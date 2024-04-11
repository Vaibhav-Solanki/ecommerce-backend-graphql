export const name = 'flushAll'

export const auth = true
export async function resolver (parent, args, contextValue, info) {
  const { context } = contextValue
  context.dal.cacheClient.flushAll()

  return true
}
