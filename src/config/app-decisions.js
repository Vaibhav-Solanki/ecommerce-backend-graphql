/**
 * This module initializes ConfigCat client and provides a function to fetch feature flag value asynchronously.
 */

// Import necessary modules
import configcat from 'configcat-node'
import { configCateKey } from './app-config.js'

// Initialize ConfigCat client with the provided SDK key
const configCatClient = configcat.getClient(configCateKey)

/**
 * Fetches the value of a feature flag asynchronously from ConfigCat.
 * @returns {Promise<boolean>} The value of the feature flag.
 */
export async function useGqlAuthWrapper () {
  // Fetch the value of the "isMyFirstFeatureEnabled" feature flag asynchronously
  // If the flag is not found, return the default value true
  return await configCatClient.getValueAsync('isMyFirstFeatureEnabled', true)
}
