/**
 * Constant representing the name of the resolver.
 * @type {string}
 */
export const name = 'createUser';

/**
 * Constant representing whether authentication is required for this resolver.
 * @type {boolean}
 */
export const auth = true;

/**
 * Resolver function for creating a user.
 * @param {object} parent - The parent object.
 * @param {object} input - The input data for creating the user.
 * @returns {object} - The input data representing the created user.
 */
export function resolver(parent, { input }) {
  // Simply return the input data representing the created user
  return input;
}
