import { createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'

import './src/config/app-config.js'
import './src/firebase.js'

import { middleware as context } from './src/context.js' // Importing the context for server
import typeDefs from './src/graphql/schema.js' // Importing GraphQL schema
import resolvers from './src/graphql/resolvers.js' // Importing GraphQL resolvers
import logger from './src/utils/logger.js'

// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers
  }),
  context
})

// Pass it into a server to hook into request handlers.
const server = createServer(yoga)

// Start the server and you're done!
server.listen(process.env.PORT, () => {
  logger.info(`🚀  Server ready at http://localhost:${process.env.PORT}/graphql`) // Logging server URL
})
