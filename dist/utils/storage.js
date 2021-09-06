"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bucketName = exports.storage = void 0;
const path_1 = __importDefault(require("path"));
const storage_1 = require("@google-cloud/storage");
exports.storage = new storage_1.Storage({
    keyFilename: path_1.default.join(__dirname, "../../jasbirrajranablog-e552f710724c.json"),
    projectId: "jasbirrajranablog",
});
exports.bucketName = exports.storage.bucket("jasbirrajranablogimages");
//# sourceMappingURL=storage.js.map