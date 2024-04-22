export const name = 'Ping'

export const auth = false

export async function resolver (parent, args, contextValue) {
  return 'Pong'
}
