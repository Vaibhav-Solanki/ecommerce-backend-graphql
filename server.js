import { createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

import './src/config/app-config.js'
import './src/firebase.js'

import { middleware as context } from './src/context.js' // Importing the context for server
import resolvers from './src/graphql/resolvers.js' // Importing GraphQL resolvers
import logger from './src/utils/logger.js'

// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({
  schema: createSchema({
    typeDefs: fs.readFileSync(
      path.join(path.dirname(fileURLToPath(import.meta.url)), './src/graphql/schema.graphql'),
      'utf-8'
    ),
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
