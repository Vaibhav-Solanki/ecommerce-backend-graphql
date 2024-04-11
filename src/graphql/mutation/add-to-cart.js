export const name = 'addToCart'

export const auth = true
export async function resolver (parent, args, contextValue, info) {
  const { context, user } = contextValue

  const { dal } = context
  const repo = await dal.getRepo('carts')
  const productRepo = await dal.getRepo('products')

  const customerId = user.identity.id
  const { product_id: productId, quantity } = args

  const product = await productRepo.findById(productId)
  if (!product) throw new Error('Product not found')

  if (product.stock_quantity < quantity) {
    throw new Error('Product Stock quantity is less than requested')
  }

  await repo.addToCart(customerId, productId, quantity)

  return { message: 'success', result: true, code: 201 }
}
