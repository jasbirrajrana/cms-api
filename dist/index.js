"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const db_1 = require("./config/db");
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const HelloResolver_1 = require("./resolvers/HelloResolver");
const chalk_1 = __importDefault(require("chalk"));
const UserResolver_1 = require("./resolvers/UserResolver");
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const redisConfig_1 = require("./utils/redisConfig");
const constants_1 = require("./Types/constants");
const PostResolver_1 = require("./resolvers/PostResolver");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    const RedisStore = connect_redis_1.default(express_session_1.default);
    app.use(express_session_1.default({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({ client: redisConfig_1.client, disableTouch: true }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: constants_1.__prod__,
        },
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
    }));
    const port = process.env.PORT || 5000;
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [HelloResolver_1.HelloResolver, UserResolver_1.UserResolver, PostResolver_1.PostResolver],
        }),
        context: ({ req, res }) => ({ req, res }),
        playground: true,
    });
    apolloServer.applyMiddleware({ app });
    db_1.Connect().then(() => {
        app.listen(port, () => {
            console.log(chalk_1.default
                .hex("#ddffbc")
                .bold(`Server is in ${process.env.NODE_ENV} mode on http://localhost:${port}/graphql`));
        });
    });
}))();
//# sourceMappingURL=index.js.map