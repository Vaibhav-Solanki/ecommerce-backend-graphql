export default  `#graphql
type User {
    id: ID!
    name: String!
    email: String!
}
input CreateUserInput {
    name: String!
    email: String!
}
type Query {
    getAllUsers: [User]
}
type Mutation {
    createUser(input: CreateUserInput!): User
}
`
