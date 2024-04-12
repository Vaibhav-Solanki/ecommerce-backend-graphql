export const name = 'countdown'

export const resolver = {
  // This will return the value on every 1 sec until it reaches 0
  subscribe: async function * (_, { from }) {
    console.log(from)
    for (let i = from; i >= 0; i--) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      yield { countdown: i }
    }
  }
}
