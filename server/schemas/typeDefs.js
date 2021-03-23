// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create the typeDefs
const typeDefs = gql `
    type Query {
        me: User
    }
    input savedBook {
        bookId: String
        title: String
        description: String
        image: String
        link: String
        authors: [String]
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: savedBook!): User
        removeBook:(bookId: ID!): User
    }
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }
    type Book {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }
    type Auth {
        token: ID!
        user: User
    }
`;

// export the typeDefs
module.exports = typeDefs;