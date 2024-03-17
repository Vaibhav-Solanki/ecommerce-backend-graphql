import BaseModel from './base.js';

class Product extends BaseModel {
    static get tableName() {
        return 'products';
    }

    static get idColumn() {
        return 'id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                brand_id: { type: 'integer' },
                category_id: { type: 'integer' },
                name: { type: 'string' },
                description: { type: 'string' },
                price: { type: 'number' },
                stock_quantity: { type: 'integer' },
            },
        };
    }

    static get relationMappings() {
        const Category = this.getModel('categories')
        const Brand = this.getModel('brands')
        return {
            brand: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: Brand,
                join: {
                    from: 'products.brand_id',
                    to: 'brands.id',
                },
            },
            category: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: Category,
                join: {
                    from: 'products.category_id',
                    to: 'categories.id',
                },
            },
        };
    }
}

export default Product;
