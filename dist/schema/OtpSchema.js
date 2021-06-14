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
exports.Otp = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
let Otp = class Otp {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Otp.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.Prop({ type: () => String }),
    __metadata("design:type", String)
], Otp.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.Prop({ type: () => Number }),
    __metadata("design:type", Number)
], Otp.prototype, "otp", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.Prop({ type: () => String }),
    __metadata("design:type", String)
], Otp.prototype, "username", void 0);
__decorate([
    typegoose_1.Prop(),
    __metadata("design:type", String)
], Otp.prototype, "password", void 0);
Otp = __decorate([
    type_graphql_1.ObjectType()
], Otp);
exports.Otp = Otp;
const OtpModel = typegoose_1.getModelForClass(Otp);
exports.default = OtpModel;
//# sourceMappingURL=OtpSchema.js.map