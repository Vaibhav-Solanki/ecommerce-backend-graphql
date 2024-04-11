export const name = 'orderPayment'

export const auth = true

export async function resolver (parent, args, contextValue) {
  const { order_id: orderId } = args

  const { dal } = contextValue.context
  const repo = await dal.getRepo('order_payments')

  return await repo.findByOrderId(orderId)
}
