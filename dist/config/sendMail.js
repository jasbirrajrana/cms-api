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
exports.sendMailForConfirmation = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const gridKey = process.env.SEND_GRID_KEY;
mail_1.default.setApiKey(gridKey);
const sendMailForConfirmation = (email, url) => __awaiter(void 0, void 0, void 0, function* () {
    yield mail_1.default
        .send({
        to: email,
        from: process.env.EMAIL_ID,
        subject: "Welcome to blog*",
        html: `<a href="${url}">${url}</a>`,
    })
        .then(() => {
        console.log("send!!");
    });
});
exports.sendMailForConfirmation = sendMailForConfirmation;
let config = "j";
console.log(config);
//# sourceMappingURL=sendMail.js.map