export const name = 'getUser'

export const auth = true

export async function resolver (parent, args, contextValue) {
  const { user } = contextValue
  return user.identity
}
