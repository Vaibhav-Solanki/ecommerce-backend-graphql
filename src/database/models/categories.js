import BaseModel from './base.js';

class Category extends BaseModel {
    static get tableName() {
        return 'categories';
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
                parent_category_id: { type: 'integer' },
            },
        };
    }

    static get relationMappings() {
        return {
            parent_category: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: Category,
                join: {
                    from: 'categories.parent_category_id',
                    to: 'categories.id',
                },
            },
        };
    }
}

export default Category;
