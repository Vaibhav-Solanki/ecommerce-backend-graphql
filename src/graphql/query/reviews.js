export const name = 'reviews'

export const auth = true

export async function resolver (parent, args, contextValue) {
  const { product_id: productId } = args

  const { dal } = contextValue.context
  const repo = await dal.getRepo('reviews')

  return await repo.findReviewByProductId(productId)
}
