import BaseModel from './base.js';

class Customer extends BaseModel {
    static get tableName() {
        return 'customers';
    }

    static get idColumn() {
        return 'id';
    }

    static get relationMappings() {
        const Address = this.getModel('addresses')
        return {
            addresses: {
                relation: BaseModel.HasManyRelation,
                modelClass: Address,
                join: {
                    from: 'customers.id',
                    to: 'addresses.customer_id',
                },
            },
        };
    }

    static get jsonSchema() {
        return {
            type: 'object',

            properties: {
                id: {
                    type: "integer"
                },
                name: {
                    type: "string"
                },
                picture: {
                    type: "string"
                },
                email: {
                    type: "string",
                    format: "email"
                },
                uid: {
                    type: "string"
                },
                password: {
                    type: "string"
                },
                created_at: {
                    type: "string",
                    format: "date-time"
                }
            },
        };
    }
}

export default Customer;
