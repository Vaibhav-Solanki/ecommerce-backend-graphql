import Base from './base.js'

class ProductRepo extends Base {
  reserveStock (product, qty) {
    return this.updateAndFetch(product, {
      stock_quantity: product.stock_quantity - qty,
      reserved_quantity: product.reserved_quantity + qty
    })
  }
}

export default ProductRepo
