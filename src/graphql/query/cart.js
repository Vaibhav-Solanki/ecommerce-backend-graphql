export const name = 'cart'

export const auth = true

export async function resolver (parent, args, contextValue) {
  const { context, user } = contextValue

  const { dal } = context
  const repo = await dal.getRepo('carts')
  const productRepo = await dal.getRepo('products')

  const customerId = user.identity.id
  let productValue = 0
  const valueDistribution = [
    {
      type: 'Delivery Charges',
      value: 25
    }
  ]

  const cartItems = await repo.findCartByCustomer(customerId)

  for (const index in cartItems) {
    cartItems[index].product = await productRepo.findById(cartItems[index].product_id)
    cartItems[index].total_value = cartItems[index].quantity * cartItems[index].product.price
    productValue += cartItems[index].total_value
  }

  valueDistribution.push({
    type: 'Product Total',
    value: productValue
  })

  const totalValue = valueDistribution.reduce((sum, cur) => sum + cur.value, 0)

  return {
    customer_id: customerId,
    total_value: totalValue,
    cart_items: cartItems,
    value_distribution: valueDistribution
  }
}
