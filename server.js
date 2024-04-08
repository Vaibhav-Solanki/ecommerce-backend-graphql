import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import './src/config/app-config.js'
import './src/firebase.js'

import { middleware as context } from './src/context.js' // Importing the context for server
import typeDefs from './src/graphql/schema.js' // Importing GraphQL schema
import resolvers from './src/graphql/resolvers.js' // Importing GraphQL resolvers
import logger from './src/utils/logger.js'

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
  context
})

logger.info(`🚀  Server ready at: ${url}`) // Logging server URL
