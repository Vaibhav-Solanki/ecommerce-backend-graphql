/**
 * This module initializes the Firebase Admin SDK and exports the Firebase app and authentication module.
 */

// Import the Firebase Admin SDK
import admin from 'firebase-admin';
// Import the authentication module from Firebase Admin SDK
import { getAuth } from 'firebase-admin/auth';

// Initialize the Firebase Admin app
export const app = admin.initializeApp();

// Get the authentication module using the initialized app
export const auth = getAuth(app);
