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
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const chalk_1 = __importDefault(require("chalk"));
const PostSchema_1 = __importDefault(require("./schema/PostSchema"));
const UserSchema_1 = __importDefault(require("./schema/UserSchema"));
const posts_1 = __importDefault(require("./data/posts"));
dotenv_1.default.config();
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        db_1.Connect();
        yield PostSchema_1.default.deleteMany();
        const adminUser = yield UserSchema_1.default.findOne({
            email: process.env.ADMIN_EMAIL,
        });
        const samplePosts = posts_1.default.map((x) => {
            return Object.assign(Object.assign({}, x), { author: adminUser === null || adminUser === void 0 ? void 0 : adminUser._id });
        });
        console.log(samplePosts);
        yield PostSchema_1.default.insertMany(samplePosts);
        console.log(chalk_1.default.bgCyan.inverse("Data imported!"));
    }
    catch (error) {
        console.log(`Error ${error.message}`);
        process.exit(1);
    }
});
importData();
//# sourceMappingURL=seeder.js.map