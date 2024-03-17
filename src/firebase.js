/**
 * This module initializes the Firebase Admin SDK and exports the Firebase app and authentication module.
 */

// Import the Firebase Admin SDK
import admin from 'firebase-admin';
import functions from 'firebase-functions';
// Import the authentication module from Firebase Admin SDK
import { getAuth } from 'firebase-admin/auth';

import { getRepo } from "./database/db.js";

// Initialize the Firebase Admin app
export const app = admin.initializeApp();

// Get the authentication module using the initialized app
export const auth = getAuth(app);



export const createCustomer = functions
    .auth
    .user()
    .onCreate(async (user) => {
        const customerData = {
            uid: user.uid,
            email: user.email,
            name: user.name,
            picture: user.picture,
        };

        const repo = getRepo('customers')
        await repo.insert(customerData)
});
