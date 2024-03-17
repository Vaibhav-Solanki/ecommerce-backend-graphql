import BaseModel from './base.js';

class Brand extends BaseModel {
    static get tableName() {
        return 'brands';
    }

    static get idColumn() {
        return 'id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                description: { type: 'string' },
                website: { type: 'string' },
            },
        };
    }
}

export default Brand;
