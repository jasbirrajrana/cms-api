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
exports.findUser = void 0;
const UserSchema_1 = __importDefault(require("../schema/UserSchema"));
const redisConfig_1 = require("./redisConfig");
const findUser = (token) => __awaiter(void 0, void 0, void 0, function* () {
    yield redisConfig_1.client.get(token, function (err, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!err) {
                return yield UserSchema_1.default.findOne({ reply });
            }
            else {
                throw new Error("Not a right way to do this!!");
            }
        });
    });
});
exports.findUser = findUser;
//# sourceMappingURL=findUser.js.map