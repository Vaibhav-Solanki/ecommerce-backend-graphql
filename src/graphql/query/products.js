export const name = 'products'

export const auth = false

export async function resolver (parent, args = {}, contextValue) {
  const { dal } = contextValue.context
  const repo = await dal.getRepo('products')

  const found = await repo.getCount(args)
  return {
    found,
    args
  }
}
