/**
 * This module exports the database connection, Firebase app, and authentication module.
 */

// Import the database connection
import * as dal from './database/db.js'

// Import the Firebase app and authentication module
import { app, auth } from './firebase.js'

// Export the database connection, app, and auth module
export default { dal, app, auth }
