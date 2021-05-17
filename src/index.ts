import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { Connect } from "./config/db";
import express from "express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/HelloResolver";
import chalk from "chalk";
import { UserResolver } from "./resolvers/UserResolver";
import session from "express-session";
import connectRedis from "connect-redis";
import { client } from "./utils/redisConfig";
import { COOKIE_NAME, __prod__ } from "./Types/constants";

(async () => {
  const app = express();
  const RedisStore = connectRedis(session);
  //express middlewares
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: client, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__,
      },
      secret: process.env.SESSION_SECRET!,
      saveUninitialized: false,
      resave: false,
    })
  );
  const port: any = process.env.PORT! || 5000;
  const apolloServer = new ApolloServer({
    schema: await buildSchema({ resolvers: [HelloResolver, UserResolver] }),
    context: ({ req, res }) => ({ req, res }),
  });
  apolloServer.applyMiddleware({ app });
  Connect().then(() => {
    app.listen(port, () => {
      console.log(
        chalk
          .hex("#ddffbc")
          .bold(
            `Server is in ${process.env.NODE_ENV} mode on http://localhost:${port}/graphql`
          )
      );
    });
  });
})();
