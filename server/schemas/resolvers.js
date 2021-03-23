// import the Book and User models
const { User, Book } = require('../models');
// import the authenticationError from apollo-server-express
const { AuthenticationError } = require('apollo-server-express');
// import signToken from auth.js
const { signToken } = require('../utils/auth');
const { sign } = require('jsonwebtoken');

const resolvers = {
    Query: {
        // use tokens for user authentication 
        me: async (parent, args, context) => {
            // check for the existance of 'context.user', if the property exists return the userData
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('savedBooks');

                    return userData;
            }
            // if no 'context.user' property exists then throw new AuthenticationError
            throw new AuthenticationError('Not logged in!');
        }
    },
    Mutation: {
        // add a user
        addUser: async (parent, args) => {
            // user data is passed in as args
            const user = await User.create(args);
            // combine the user data with the token
            const token = signToken(user);
            // create the token for the new user and return token and user
            return { token, user };
        },
        // user login
        login: async (parent, { email, password }) => {
            // find the user by provided email
            const user = await User.findOne({ email })
            // if there isn't a user by that email throw the new AuthenticationError
            if (!user) {
                throw new AuthenticationError('Incorrect Username!');
            }
            // check to see if the password is correct
            const correctPw = await user.isCorrectPassword(password);
            // if the password is incorrect throw the new AuthenticationError
            if (!correctPw) {
                throw new AuthenticationError('Incorrect Password!');
            }

            // create the token for the user login and return token and user
            const token = signToken(user);
            return { token, user };
        }
    }
}