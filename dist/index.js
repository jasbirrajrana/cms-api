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
const graphql_upload_1 = require("graphql-upload");
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const connect_redis_1 = __importDefault(require("connect-redis"));
const HelloResolver_1 = require("./resolvers/HelloResolver");
const chalk_1 = __importDefault(require("chalk"));
const cors_1 = __importDefault(require("cors"));
const UserResolver_1 = require("./resolvers/UserResolver");
const express_session_1 = __importDefault(require("express-session"));
const constants_1 = require("./Types/constants");
const PostResolver_1 = require("./resolvers/PostResolver");
const confirmUserResolver_1 = require("./resolvers/confirmUserResolver");
const redisConfig_1 = require("./utils/redisConfig");
const uploadImageResolver_1 = require("./resolvers/uploadImageResolver");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    if (constants_1.__prod__) {
        app.set("trust proxy", 1);
    }
    app.use(graphql_upload_1.graphqlUploadExpress());
    var corsOptions = {
        origin: ["https://test.eduyear.in", "http://localhost:3000"],
        optionsSuccessStatus: 200,
    };
    app.use(cors_1.default(Object.assign(Object.assign({}, corsOptions), { credentials: true })));
    const RedisStore = connect_redis_1.default(express_session_1.default);
    app.use(express_session_1.default({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({
            client: redisConfig_1.client,
            disableTouch: true,
        }),
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
            resolvers: [
                HelloResolver_1.HelloResolver,
                UserResolver_1.UserResolver,
                PostResolver_1.PostResolver,
                confirmUserResolver_1.ConfirmUserResolver,
                uploadImageResolver_1.UploadResolver,
            ],
        }),
        context: ({ req, res }) => ({ req, res }),
        uploads: false,
        playground: true,
    });
    apolloServer.applyMiddleware({ app, cors: false });
    db_1.Connect()
        .then(() => {
        app.listen(port, () => {
            console.log(chalk_1.default
                .hex("#ddffbc")
                .bold(`Server is in ${process.env.NODE_ENV} mode on http://localhost:${port}/graphql`));
        });
    })
        .catch((e) => {
        console.log(e, "Error");
    });
}))();
//# sourceMappingURL=index.js.map