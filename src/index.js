import { GraphQLServer, PubSub } from 'graphql-yoga';
require('dotenv').config();

const models = require('./db/db');
import resolvers from './graphql/resolvers/resolvers';
import { isAuthenticated } from './graphql/middlewares/middleware';

const pubsub = new PubSub();

const server = new GraphQLServer({
    typeDefs: './src/graphql/schema.graphql',
    resolvers,
    context: ({ request, response, ...rest }) => {
        return {
            req : request,
            res : response,
            pubsub,
            ...models
        }
    },
    middlewares: [isAuthenticated]
});

server.start(() => {
    console.log('server is running on port 4000');
});