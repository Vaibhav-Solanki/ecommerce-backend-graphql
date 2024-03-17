/**
 * This module initializes a Knex client for interacting with a database using Objection.js.
 */

// Import necessary modules
import knex from 'knex';
import { db } from '../config/app-config.js';

const logInfo = (...args) => console.info(...args);

// Initialize Knex client with database configuration and snake case mappers
export const client = knex(db);

const composeEntityModelFilename = entity => `./models/${entity}.js`;
const composeEntityRepoFilename = entity => `./repository/${entity}.js`;

const modelMap = new Map();
const repoMap = new Map();

export const getModel = async (entity) => {
  let model = modelMap.get(entity);
  if (model) {
    return model;
  } else {
    const filename = composeEntityModelFilename(entity);
    logInfo(`Loading model file: ${filename}`);
    const { default: model } = await import(filename)
    model.knex(client)
    modelMap.set(entity, model);
    return model;
  }
};

export const getRepo = async (entityName) => {
  let repo = repoMap.get(entityName);
  if (repo) {
    return repo;
  } else {
    const filename = composeEntityRepoFilename(entityName);
    logInfo(`Loading repo file: ${filename}`);
    const { default: repoClass } = await import(filename)
    const model = await getModel(entityName)
    repo = new repoClass(entityName, model, getModel, getRepo);
    repoMap.set(entityName, repo);
    return repo;
  }
};
