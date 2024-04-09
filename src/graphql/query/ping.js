export const name = 'Ping'

export const auth = true

export async function resolver (parent, args, contextValue) {
  return 'Pong'
}
