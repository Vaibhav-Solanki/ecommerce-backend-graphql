/**
 * This module initializes a Knex client for interacting with a database using Objection.js.
 */

// Import necessary modules
import knex from 'knex';
import { knexSnakeCaseMappers } from 'objection';
import { db } from '../config/app-config.js';

// Initialize Knex client with database configuration and snake case mappers
const client = knex({
  ...db, // Spread database configuration
  ...knexSnakeCaseMappers() // Spread snake case mappers for column names
});

// Export the initialized Knex client
export default client;
