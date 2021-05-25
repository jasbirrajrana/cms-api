"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const redis_1 = __importDefault(require("redis"));
const bluebird_1 = __importDefault(require("bluebird"));
bluebird_1.default.promisifyAll(redis_1.default);
exports.client = redis_1.default.createClient(6380, process.env.REDIS_CACHE_HOST_NAME, {
    auth_pass: process.env.REDIS_CACHE_KEY,
    tls: process.env.REDIS_CACHE_HOST_NAME,
});
//# sourceMappingURL=redisConfig.js.map