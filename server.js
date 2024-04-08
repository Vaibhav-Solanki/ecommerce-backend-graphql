import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import './src/config/app-config.js'
import './src/firebase.js'

import context from './src/context.js' // Importing the context for server
import typeDefs from './src/graphql/schema.js' // Importing GraphQL schema
import resolvers from './src/graphql/resolvers.js' // Importing GraphQL resolvers

// Creating an ApolloServer instance
const server = new ApolloServer({
  typeDefs, // GraphQL schema
  resolvers, // GraphQL resolvers
  formatError: (formattedError) => {
    // Formatting the error for response
    return { message: formattedError.message, code: formattedError.extensions.code }
  }
})

// Starting the standalone server
const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT }, // Listening port
  context: async ({ req }) => {
    // Custom context function to handle authorization

    const { dal } = context
    const repo = await dal.getRepo('customers')

    // get the user token from the headers
    const token = req.headers.authorization
    const user = {
      identity: {},
      decoded: {},
      isAuthorized: false
    }

    if (!token) return { user, context }

    try {
      // Verifying user token
      const decoded = await context.auth.verifyIdToken(token)
      if (decoded.id) {
        user.identity = await repo.findUserById(decoded.id)
      } else {
        user.identity = await repo.registerUser(decoded)
        await context.auth.setCustomUserClaims(user.identity.uid, { id: user.identity.id })
      }

      user.isAuthorized = true
      user.decoded = decoded
    } catch (error) {
      console.warn(error)
    }
    return { user, context }
  }
})

console.log(`🚀  Server ready at: ${url}`) // Logging server URL
