"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UploadResolver = void 0;
const isAuth_1 = require("../middleware/isAuth");
const type_graphql_1 = require("type-graphql");
const graphql_upload_1 = require("graphql-upload");
const cloudinary_1 = __importDefault(require("cloudinary"));
let UploadResolver = class UploadResolver {
    upload({ createReadStream, filename }, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            cloudinary_1.default.v2.config({
                cloud_name: process.env.CLOUDINARY_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
            });
            try {
                const result = yield new Promise((resolve, reject) => {
                    createReadStream().pipe(cloudinary_1.default.v2.uploader.upload_stream((error, result) => {
                        if (error) {
                            reject(error);
                        }
                        resolve(result);
                    }));
                });
                const newPhoto = { filename, path: result.secure_url };
                return newPhoto.path;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => String),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.UseMiddleware(isAuth_1.isAdmin),
    __param(0, type_graphql_1.Arg("file", () => graphql_upload_1.GraphQLUpload)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UploadResolver.prototype, "upload", null);
UploadResolver = __decorate([
    type_graphql_1.ObjectType()
], UploadResolver);
exports.UploadResolver = UploadResolver;
//# sourceMappingURL=uploadImageResolver.js.map