import calculateValueDistribution from '../../utils/tax.js'
export const name = 'placeOrder'

export const auth = true
export async function resolver (parent, args, contextValue, info) {
  const { context, user } = contextValue

  const { dal } = context
  const cartsRepo = await dal.getRepo('carts')
  const ordersRepo = await dal.getRepo('orders')
  const addressesRepo = await dal.getRepo('addresses')
  const productRepo = await dal.getRepo('products')

  const customerId = user.identity.id
  const { shipping_address_id: shippingAddressId, payment_method: paymentMethod } = args

  const cartItems = await cartsRepo.findCartByCustomer(customerId)
  if (!cartItems?.length) throw new Error('Cart not found')

  const address = await addressesRepo.findById(shippingAddressId)
  if (!address) throw new Error('address not found')

  const orderItems = []
  let productValue = 0
  for (const cartItem of cartItems) {
    const product = await productRepo.findById(cartItem.product_id)
    if (product.stock_quantity < cartItem.quantity) {
      throw new Error('Product Stock quantity is less than requested')
    }

    productValue += (cartItem.quantity * product.price)

    await productRepo.reserveStock(product, cartItem.quantity)
    orderItems.push({ product_id: product.id, quantity: cartItem.quantity, unit_price: Number(product.price) })
  }

  const { totalAmount, valueDistribution } = calculateValueDistribution(productValue, 0, 50, 18)

  const orderData = {
    customer_id: customerId,
    total_amount: totalAmount,
    value_distribution: valueDistribution,
    status: 'Placed',
    shipping_address_id: shippingAddressId,
    payment_method: paymentMethod,
    payment_status: 0,
    order_items: orderItems
  }

  await ordersRepo.insertGraph(orderData)
  await cartsRepo.delete({ customer_id: customerId })

  return { message: 'success', result: true, code: 201 }
}
