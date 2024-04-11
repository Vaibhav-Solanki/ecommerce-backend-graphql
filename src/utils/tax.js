function calculateTotalPrice (originalPrice, gstRate) {
  return originalPrice * (gstRate / 100)
}

export default function (orderValue = 0, discount = 0, shippingCharges = 0, gst = 0) {
  const valueDistribution = [{
    type: 'Product Total',
    value: orderValue
  }]
  let totalAmount = orderValue

  if (discount) {
    valueDistribution.push({
      type: 'Discount',
      value: -discount
    })
    totalAmount -= discount
  }

  if (shippingCharges) {
    valueDistribution.push({
      type: 'Shipping Charges',
      value: shippingCharges
    })
    totalAmount += shippingCharges
  }

  if (gst) {
    const tax = calculateTotalPrice(orderValue, gst)
    valueDistribution.push({
      type: `Tax GST ${gst}%`,
      value: tax
    })
    totalAmount += tax
  }

  return { totalAmount, valueDistribution }
}
