export const name = 'ProductVariant';

export const resolver = {
    async product(parent, args, contextValue) {
        const {dal} = contextValue.context

        const repo = await dal.getRepo('products')
        if(parent.product_id) return await repo.findById(parent.product_id)
        return null
    }
}
