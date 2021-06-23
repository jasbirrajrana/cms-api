"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAsync = exports.client = void 0;
const redis_1 = __importDefault(require("redis"));
const util_1 = require("util");
exports.client = redis_1.default.createClient({
    url: process.env.REDIS_PUBLIC_ENDPOINT,
    auth_pass: process.env.REDIS_DATABASE_PASSWORD,
});
exports.getAsync = util_1.promisify(exports.client.get).bind(exports.client);
exports.client.on("error", (err) => {
    global.console.log(err.message);
});
//# sourceMappingURL=redisConfig.js.map