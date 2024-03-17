import BaseModel from './base.js';

class ProductVariant extends BaseModel {
    static get tableName() {
        return 'product_variants';
    }

    static get idColumn() {
        return 'id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                product_id: { type: 'integer' },
                variant_name: { type: 'string' },
                variant_description: { type: 'string' },
                price: { type: 'number' },
                stock_quantity: { type: 'integer' },
            }
        };
    }

    static get relationMappings() {
        const Product = this.getModel('products')
        return {
            product: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: Product,
                join: {
                    from: 'product_variants.product_id',
                    to: 'products.id',
                },
            },
        };
    }
}

export default ProductVariant;
