/**
 * Constant representing the name of the resolver.
 * @type {string}
 */
export const name = 'getAllUsers';

/**
 * Constant representing whether authentication is required for this resolver.
 * @type {boolean}
 */
export const auth = true;

/**
 * Resolver function for fetching all users.
 * @returns {Array<object>} - An array of user objects.
 */
export function resolver() {
  // Return an array of user objects
  return [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];
}
