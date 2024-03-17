export default  `#graphql
type Brand {
    id: Int!
    name: String!
    description: String
    website: String
}

type Category {
    id: Int!
    name: String!
    description: String
    parent_category_id: Int
    parent_category: Category
}

type Product {
    id: Int!
    brand: Brand
    category: Category
    name: String!
    description: String
    price: Float!
    stock_quantity: Int!
    created_at: String!
}

type ProductVariant {
    id: Int!
    product: Product!
    variant_name: String!
    variant_description: String
    price: Float!
    stock_quantity: Int!
}

type Address {
    id: Int!
    customer_id: Int!
    customer: Customer!
    address_line1: String!
    address_line2: String
    city: String!
    state: String!
    country: String!
    postal_code: String!
}

type Customer {
    id: Int!
    name: String!
    picture: String
    email: String!
    uid: String!
    password: String
    created_at: String!
    addresses: [Address]
}

type Order {
    id: Int!
    customer_id: Int!
    customer: Customer!
    order_date: String!
    total_amount: Float!
    status: String!
    shipping_address_id: Int!
    shipping_address: Address!
    payment_method: String
    order_items: [OrderItem]!
}

type OrderItem {
    id: Int!
    order_id: Int!
    order: Order!
    product_id: Int!
    product: Product!
    quantity: Int!
    unit_price: Float!
}

type Cart {
    id: Int!
    customer_id: Int!
    customer: Customer!
    product_id: Int!
    product: Product!
    quantity: Int!
    created_at: String!
}

type OrderPayment {
    id: Int!
    order_id: Int!
    order: Order!
    amount: Float!
    payment_date: String!
    payment_status: String!
    payment_method: String
}

type Review {
    id: Int!
    product_id: Int!
    product: Product!
    customer_id: Int!
    customer: Customer!
    rating: Int!
    review_text: String
    review_date: String!
}

type Query {
    brands: [Brand]
    brand(id: Int!): Brand
    categories: [Category]
    category(id: Int!): Category
    products(category_id: Int brand_id: Int): [Product]
    product(id: Int!): Product
    productVariants(id: Int product_id: Int): [ProductVariant]
    addresses: [Address]
    address(id: Int!): Address
    customers: [Customer]
    customer(id: Int!): Customer
    orders(customer_id: Int): [Order]
    order(id: Int!): Order
    carts(customer_id: Int): [Cart]
    cart(id: Int!): Cart
    orderPayments(order_id:Int!): [OrderPayment]
    orderPayment(id: Int!): OrderPayment
    reviews(product_id: Int!): [Review]
    review(id: Int!): Review
}

type Mutation {
    createBrand(name: String!, description: String, website: String): Brand
    updateBrand(id: Int!, name: String, description: String, website: String): Brand
    deleteBrand(id: Int!): Brand

    createCategory(name: String!, description: String, parent_category_id: Int): Category
    updateCategory(id: Int!, name: String, description: String, parent_category_id: Int): Category
    deleteCategory(id: Int!): Category

    createProduct(brand_id: Int!, category_id: Int!, name: String!, description: String, price: Float!, stock_quantity: Int!): Product
    updateProduct(id: Int!, brand_id: Int, category_id: Int, name: String, description: String, price: Float, stock_quantity: Int): Product
    deleteProduct(id: Int!): Product

    createProductVariant(product_id: Int!, variant_name: String!, variant_description: String, price: Float!, stock_quantity: Int!): ProductVariant
    updateProductVariant(id: Int!, product_id: Int, variant_name: String, variant_description: String, price: Float, stock_quantity: Int): ProductVariant
    deleteProductVariant(id: Int!): ProductVariant

    createAddress(customer_id: Int!, address_line1: String!, address_line2: String, city: String!, state: String!, country: String!, postal_code: String!): Address
    updateAddress(id: Int!, customer_id: Int, address_line1: String, address_line2: String, city: String, state: String, country: String, postal_code: String): Address
    deleteAddress(id: Int!): Address

    createCustomer(first_name: String!, last_name: String!, email: String!, password: String!): Customer
    updateCustomer(id: Int!, first_name: String, last_name: String, email: String, password: String): Customer
    deleteCustomer(id: Int!): Customer

    createOrder(customer_id: Int!, total_amount: Float!, status: String!, shipping_address_id: Int!, payment_method: String): Order
    updateOrder(id: Int!, customer_id: Int, total_amount: Float, status: String, shipping_address_id: Int, payment_method: String): Order
    deleteOrder(id: Int!): Order

    createOrderItem(order_id: Int!, product_id: Int!, quantity: Int!, unit_price: Float!): OrderItem
    updateOrderItem(id: Int!, order_id: Int, product_id: Int, quantity: Int, unit_price: Float): OrderItem
    deleteOrderItem(id: Int!): OrderItem

    createCart(customer_id: Int!, product_id: Int!, quantity: Int!): Cart
    updateCart(id: Int!, customer_id: Int, product_id: Int, quantity: Int): Cart
    deleteCart(id: Int!): Cart

    createOrderPayment(order_id: Int!, amount: Float!, payment_status: String!, payment_method: String): OrderPayment
    updateOrderPayment(id: Int!, order_id: Int, amount: Float, payment_status: String, payment_method: String): OrderPayment
    deleteOrderPayment(id: Int!): OrderPayment

    createReview(product_id: Int!, customer_id: Int!, rating: Int!, review_text: String): Review
    updateReview(id: Int!, product_id: Int, customer_id: Int, rating: Int, review_text: String): Review
    deleteReview(id: Int!): Review
}
`
