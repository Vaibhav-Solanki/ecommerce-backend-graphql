import calculateValueDistribution from '../../utils/tax.js'

export const name = 'cart'

export const auth = true

export async function resolver (parent, args, contextValue) {
  const { context, user } = contextValue

  const { dal } = context
  const repo = await dal.getRepo('carts')
  const productRepo = await dal.getRepo('products')

  const customerId = user.identity.id
  let productValue = 0

  const cartItems = await repo.findGroup({ customer_id: customerId })

  for (const index in cartItems) {
    cartItems[index].product = await productRepo.findById(cartItems[index].product_id)
    cartItems[index].total_value = cartItems[index].quantity * cartItems[index].product.price
    productValue += cartItems[index].total_value
  }

  const { totalAmount, valueDistribution } = calculateValueDistribution(productValue, 0, 50, 18)

  return {
    customer_id: customerId,
    total_value: totalAmount,
    cart_items: cartItems,
    value_distribution: valueDistribution
  }
}
