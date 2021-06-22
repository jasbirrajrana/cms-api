import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { Connect } from "./config/db";
// import MongoStore from "connect-mongo";
import express from "express";
import { buildSchema } from "type-graphql";
import connectRedis from "connect-redis";
import { HelloResolver } from "./resolvers/HelloResolver";
import chalk from "chalk";
import cors from "cors";
import { UserResolver } from "./resolvers/UserResolver";
import session from "express-session";
import { COOKIE_NAME, __prod__ } from "./Types/constants";
import { PostResolver } from "./resolvers/PostResolver";
import { ConfirmUserResolver } from "./resolvers/confirmUserResolver";
import { client } from "./utils/redisConfig";
(async () => {
  const app = express();
  if (__prod__) {
    app.set("trust proxy", 1);
  }
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  const RedisStore = connectRedis(session);
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: client,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
      },
      secret: process.env.SESSION_SECRET!,
      saveUninitialized: false,
      resave: false,
    })
  );
  const port: any = process.env.PORT! || 5000;
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        HelloResolver,
        UserResolver,
        PostResolver,
        ConfirmUserResolver,
      ],
    }),
    context: ({ req, res }) => ({ req, res }),
    playground: true,
    introspection: true,
  });
  apolloServer.applyMiddleware({ app, cors: false });

  Connect()
    .then(() => {
      app.listen(port, () => {
        console.log(
          chalk
            .hex("#ddffbc")
            .bold(
              `Server is in ${process.env.NODE_ENV} mode on http://localhost:${port}/graphql`
            )
        );
      });
    })
    .catch((e) => {
      console.log(e, "Error");
    });
})();
