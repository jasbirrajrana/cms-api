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
exports.isSuperAdmin = exports.isAdmin = exports.isAuth = void 0;
const UserSchema_1 = __importDefault(require("../schema/UserSchema"));
const isAuth = ({ context }, next) => {
    if (!context.req.session.userId) {
        throw new Error("Not Authenticated");
    }
    return next();
};
exports.isAuth = isAuth;
const isAdmin = ({ context }, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserSchema_1.default.findById(context.req.session.userId);
    if (!(user === null || user === void 0 ? void 0 : user.isAdmin)) {
        throw new Error("Not Authenticated!");
    }
    return next();
});
exports.isAdmin = isAdmin;
const isSuperAdmin = ({ context }, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserSchema_1.default.findById(context.req.session.userId);
    if (!(user === null || user === void 0 ? void 0 : user.isSuperAdmin)) {
        throw new Error("Not Authenticated as Super Admin");
    }
    return next();
});
exports.isSuperAdmin = isSuperAdmin;
//# sourceMappingURL=isAuth.js.map