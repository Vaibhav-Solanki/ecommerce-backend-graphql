import BaseModel from './base.js';

class Cart extends BaseModel {
    static get tableName() {
        return 'carts';
    }

    static get idColumn() {
        return 'id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                customer_id: { type: 'integer' },
                product_id: { type: 'integer' },
                quantity: { type: 'integer' },
                created_at: { type: 'string', format: 'date-time' },
            },
        };
    }

    static get relationMappings() {
        const Customer = this.getModel('customers')
        const Product = this.getModel('products')
        return {
            customer: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: Customer,
                join: {
                    from: 'carts.customer_id',
                    to: 'customers.id',
                },
            },
            product: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: Product,
                join: {
                    from: 'carts.product_id',
                    to: 'products.id',
                },
            },
        };
    }
}

export default Cart;
