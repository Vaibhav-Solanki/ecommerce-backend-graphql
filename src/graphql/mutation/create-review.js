export const name = 'createReview'

export const auth = true
export async function resolver (parent, args, contextValue, info) {
  const { context, user } = contextValue

  const { dal } = context
  const reviewsRepo = await dal.getRepo('reviews')
  const productRepo = await dal.getRepo('products')

  const customerId = user.identity.id
  const { product_id: productId, rating, review_text: reviewText } = args

  const product = await productRepo.findById(productId)
  if (!product) throw new Error('Product not found')

  return await reviewsRepo.insert({
    rating,
    customer_id: customerId,
    product_id: productId,
    review_text: reviewText
  })
}
