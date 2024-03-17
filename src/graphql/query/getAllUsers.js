/**
 * Constant representing the name of the resolver.
 * @type {string}
 */
export const name = 'customers';

/**
 * Constant representing whether authentication is required for this resolver.
 * @type {boolean}
 */
export const auth = false;

/**
 * Resolver function for fetching all users.
 * @returns {Array<object>} - An array of user objects.
 */
export async function resolver({ context }) {
  const {dal} = context

  const repo = await dal.getRepo('customers')


  return await repo.findAll();
}
