export const name = 'orderPayments'

export const auth = true

export async function resolver (parent, args, contextValue) {
  const { context, user } = contextValue
  const { dal } = context

  const repo = await dal.getRepo('order_payments')

  return await repo.findPaymentsByCustomerId(user.identity.id)
}
