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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
const UserSchema_1 = require("./UserSchema");
let Post = class Post {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Post.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field((_type) => UserSchema_1.User),
    typegoose_1.Prop({ ref: UserSchema_1.User, required: true }),
    __metadata("design:type", String)
], Post.prototype, "author", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.Prop({ type: () => String }),
    __metadata("design:type", String)
], Post.prototype, "slug", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.Prop({ type: () => String, required: true }),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.Prop({ type: () => String, required: true }),
    __metadata("design:type", String)
], Post.prototype, "body", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.Prop({ default: Date.now() }),
    __metadata("design:type", Date)
], Post.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.Prop({ default: Date.now() }),
    __metadata("design:type", Date)
], Post.prototype, "updatedAt", void 0);
Post = __decorate([
    type_graphql_1.ObjectType()
], Post);
exports.Post = Post;
const PostModel = typegoose_1.getModelForClass(Post);
exports.default = PostModel;
//# sourceMappingURL=PostSchema.js.map