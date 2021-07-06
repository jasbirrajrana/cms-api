"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.PostResolver = void 0;
const isAuth_1 = require("../middleware/isAuth");
const type_graphql_1 = require("type-graphql");
const PostSchema_1 = __importStar(require("../schema/PostSchema"));
const slugify_1 = __importDefault(require("slugify"));
let PostResolver = class PostResolver {
    getPostByslug(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield PostSchema_1.default.findOne({ slug }).populate("author", "username _id, email");
            console.log(post);
            if (!post) {
                throw new Error("Post Not found!");
            }
            return post;
        });
    }
    getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield PostSchema_1.default.find({}).populate("author", "username _id email");
            console.log(posts);
            return posts;
        });
    }
    createPost(title, body, subtitle, description, featureImage, tag, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const slug = slugify_1.default(title);
            const post = yield PostSchema_1.default.create({
                title,
                body,
                author: req.session.userId,
                slug,
                description,
                featureImage,
                tag,
                subtitle,
            });
            yield post.save();
            return true;
        });
    }
    updatePost(slug, title, body, subtitle, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield PostSchema_1.default.findOne({ slug }).populate("author", "username _id, email");
            if (!post) {
                throw new Error("Post not found!");
            }
            if (post) {
                post.title = title || post.title;
                post.subtitle = subtitle || post.subtitle;
                post.slug = title ? slugify_1.default(title) : post.slug;
                post.body = body || post.body;
                post.description = description || post.description;
            }
            const updatedPost = yield post.save();
            console.log("updated!");
            return updatedPost;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => PostSchema_1.Post),
    __param(0, type_graphql_1.Arg("slug", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "getPostByslug", null);
__decorate([
    type_graphql_1.Query(() => [PostSchema_1.Post]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "getAllPosts", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.UseMiddleware(isAuth_1.isAdmin),
    __param(0, type_graphql_1.Arg("title", () => String)),
    __param(1, type_graphql_1.Arg("body", () => String)),
    __param(2, type_graphql_1.Arg("subtitle", { nullable: true })),
    __param(3, type_graphql_1.Arg("description", { nullable: true })),
    __param(4, type_graphql_1.Arg("featureImage", () => String)),
    __param(5, type_graphql_1.Arg("tag", () => String)),
    __param(6, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createPost", null);
__decorate([
    type_graphql_1.Mutation(() => PostSchema_1.Post),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.UseMiddleware(isAuth_1.isAdmin),
    __param(0, type_graphql_1.Arg("slug", () => String)),
    __param(1, type_graphql_1.Arg("title", { nullable: true })),
    __param(2, type_graphql_1.Arg("body", { nullable: true })),
    __param(3, type_graphql_1.Arg("subtitle", { nullable: true })),
    __param(4, type_graphql_1.Arg("description", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "updatePost", null);
PostResolver = __decorate([
    type_graphql_1.ObjectType()
], PostResolver);
exports.PostResolver = PostResolver;
//# sourceMappingURL=PostResolver.js.map