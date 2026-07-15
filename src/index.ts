import express from 'express';
import {ApolloServer} from "@apollo/server";
import { expressMiddleware } from '@as-integrations/express5';
import {typeDefs} from "./types/types";
import {resolvers} from "./types/resolver";

const app = express();
const PORT = 4000;

async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    })
    await server.start();
    app.use('/graphql', express.json(), expressMiddleware(server));
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    })
}

startServer()