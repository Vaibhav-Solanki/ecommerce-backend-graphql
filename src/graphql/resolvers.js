/**
 * This script dynamically loads GraphQL resolver modules from files and initializes them.
 * It exports an object containing all loaded resolver functions organized by resolver type.
 */

// Import required modules
import glob from 'glob-promise';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import gqlWrapper from './gql-wrapper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define a helper function to log information
const logInfo = (...args) => console.info(...args);

// Generate resolver file pattern based on resolver type
const generateResolverPattern = (resolver) => {
    return path.join(__dirname, `${resolver}/*.js`)
};

// Load resolver packages from files
const loadResolverPackages = async (files) => {
    return Promise.all(files.map(async (file) => {
        logInfo(`Loading resolver file: ${file}`);
        return await import(file);
    }));
};

// Initialize resolvers for a given resolver type
const initializeResolvers = async (resolverType) => {
    // Generate resolver file pattern
    const resolverPattern = generateResolverPattern(resolverType);
    logInfo(`Loading ${resolverType} resolvers from ${resolverPattern}`);

    // Find resolver files matching the pattern
    const files = await glob(resolverPattern);

    // Load resolver packages from files
    const packages = await loadResolverPackages(files);

    // Initialize an object to store resolvers
    const resolvers = {};

    // If resolver packages are found
    if (packages && packages.length) {
        // Iterate over each package
        for (const pkg of packages) {
            // Wrap resolver function with authentication check and add to resolvers object
            resolvers[pkg.name] = gqlWrapper(pkg.resolver, pkg.auth);
        }
    }

    return resolvers;
};

// Define resolver types
const resolverTypes = ['Query', 'Mutation'];
// Initialize an object to store resolvers organized by type
const typeResolvers = {};

// Load all resolvers for each resolver type
async function loadAllResolvers() {
    for (const resolverType of resolverTypes) {
        typeResolvers[resolverType] = await initializeResolvers(resolverType.toLowerCase());
    }
}

// Load all resolvers
await loadAllResolvers();

// Export the object containing all loaded resolver functions organized by resolver type
export default typeResolvers;
