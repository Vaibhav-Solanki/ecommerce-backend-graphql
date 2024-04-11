/**
 * This module initializes a Knex client for interacting with a database using Objection.js.
 */

// Import necessary modules
import knex from 'knex'
import NodeCache from 'node-cache'
import { db } from '../config/app-config.js'
import logger from '../utils/logger.js'

const cacheClient = new NodeCache()

// Initialize Knex client with database configuration and snake case mappers
export const client = knex(db)

const composeEntityModelFilename = entity => `./models/${entity}.js`
const composeEntityRepoFilename = entity => `./repository/${entity}.js`

const modelMap = new Map()
const repoMap = new Map()

export const getModel = (entity) => {
  const model = modelMap.get(entity)
  if (model) {
    return model
  } else {
    return new Promise((resolve, reject) => {
      const filename = composeEntityModelFilename(entity)
      logger.info(`Loading model file: ${filename}`)
      import(filename)
        .then(({ default: model }) => {
          model.knex(client)
          modelMap.set(entity, model)
          resolve(model)
        })
        .catch(reject)
    })
  }
}

export const getRepo = async (entityName) => {
  let repo = repoMap.get(entityName)
  if (repo) {
    return repo
  } else {
    const filename = composeEntityRepoFilename(entityName)
    logger.info(`Loading repo file: ${filename}`)
    const { default: RepoClass } = await import(filename)
    const model = await getModel(entityName)
    repo = new RepoClass(entityName, model, getModel, getRepo, cacheClient)
    repoMap.set(entityName, repo)
    return repo
  }
}

const repoList = [
  'order_payments',
  'addresses',
  'brands',
  'carts',
  'categories',
  'customers',
  'order_items',
  'orders',
  'product_images',
  'products',
  'reviews'
]

// preload
repoList.map(repo => getRepo(repo))
