"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const redis_1 = __importDefault(require("redis"));
exports.client = redis_1.default.createClient({
    url: process.env.REDIS_PUBLIC_ENDPOINT,
    auth_pass: process.env.REDIS_DATABASE_PASSWORD,
    port: process.env.REDIS_CACHE_PORT,
});
exports.client.on("error", function (err) {
    console.log("Redis error encountered", err);
});
exports.client.on("end", function () {
    console.log("Redis connection closed");
});
//# sourceMappingURL=redisConfig.js.map