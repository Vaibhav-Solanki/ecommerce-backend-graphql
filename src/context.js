/**
 * This module exports the database connection, Firebase app, and authentication module.
 */

// Import the database connection
import * as dal from './database/db.js'

// Import the Firebase app and authentication module
import { app, auth } from './firebase.js'
import logger from './utils/logger.js'

// Export the database connection, app, and auth module
export const context = { dal, app, auth, logger }

export async function middleware ({ request }) {
  // Custom context function to handle authorization
  const repo = await dal.getRepo('customers')

  // get the user token from the headers
  const token = request.headers.get('authorization')
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
    logger.warn(error)
  }
  return { user, context }
}
