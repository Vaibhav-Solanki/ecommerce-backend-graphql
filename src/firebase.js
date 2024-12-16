/**
 * This module initializes the Firebase Admin SDK and exports the Firebase app and authentication module.
 */

// Import the Firebase Admin SDK
import admin from 'firebase-admin'
import functions from 'firebase-functions'
// Import the authentication module from Firebase Admin SDK
import { getAuth } from 'firebase-admin/auth'

import { getRepo } from './database/db.js'

// Initialize the Firebase Admin app
export const app = admin.initializeApp()

// Get the authentication module using the initialized app
export const auth = getAuth(app)

export const createCustomer = functions
  .auth
  .user()
  .onCreate(async (user) => {
    const customerData = {
      uid: user.uid,
      email: user.email,
      name: user.name,
      picture: user.picture
    }

    const repo = getRepo('customers')
    await repo.insert(customerData)
  })

export const handleFcmToken = async (user, token) => {
  const repo = await getRepo('fcm_notification')
  const fcmTokens = await repo.findByUserId(user.identity.id)
  if (fcmTokens.length > 0) {
    const tokenMap = repo.mapBy('fcm_token', fcmTokens)
    if (tokenMap.has(token)) {
      return true
    }
  }
  await repo.insert({ customer_id: user.identity.id, fcm_token: token })
  return true
}
