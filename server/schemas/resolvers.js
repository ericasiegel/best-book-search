// import the Book and User models
const { User, Book } = require('../models');
// import the authenticationError from apollo-server-express
const { AuthenticationError } = require('apollo-server-express');
// import signToken from auth.js
const { signToken } = require('../utils/auth');

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
    }
}