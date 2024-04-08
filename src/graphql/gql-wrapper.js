/**
 * A wrapper function for GraphQL resolvers to handle authentication and error handling.
 * @param {Function} resolver - The resolver function to be wrapped.
 * @param {boolean} isPrivate - Indicates whether the resolver requires authentication.
 * @returns {Function} - The wrapped resolver function.
 */
import { GraphQLError } from 'graphql'

export default function (resolver, isPrivate) {
  return async (...args) => {
    const requestContext = args[2]

    const { user } = requestContext

    // If the resolver requires authentication and the user is not authorized, throw an error
    if (isPrivate && !user.isAuthorized) {
      throw new GraphQLError('You are not authorized to perform this action', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 }
        }
      })
    }

    try {
      // Call the resolver function with request context and data
      return await resolver(...args)
    } catch (e) {
      console.error(e)
      // If an error occurs during resolver execution, throw a GraphQL error with appropriate status code
      throw new GraphQLError(e.message, {
        extensions: {
          code: 'ERROR',
          http: { status: 401 }
        }
      })
    }
  }
};
