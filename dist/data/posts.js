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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
console.log("---->data-->post.ts---->__dirname", `${__dirname}`);
const content = fs.readFileSync(`${__dirname}/post.md`, "utf-8");
console.log(content);
const posts = [
    {
        slug: "github-dark-mode",
        title: "Github Dark Mode",
        subtitle: "Step by step guide to becoming a modern front-end web developer.",
        featureImage: "https://images.unsplash.com/photo-1621880512780-d47a90bd58f4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
        description: "GitHub just announced Dark Mode at GitHub Universe 2020 conference. I'm super duper excited. Check out my reaction video and a couple of other excellent features Nat Friedman (GitHub's CEO) announced in the keynote.",
        body: content,
        likes: 10,
        tag: "git"
    },
    {
        slug: "screencasting-tip-auto-hide-cursor-on-macOS",
        title: "Screencasting Tip: Auto Hide Cursor on macOS",
        subtitle: "Step by step guide to becoming a modern front-end web developer.",
        featureImage: "https://images.unsplash.com/photo-1621880512780-d47a90bd58f4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
        description: "GitHub just announced Dark Mode at GitHub Universe 2020 conference. I'm super duper excited. Check out my reaction video and a couple of other excellent features Nat Friedman (GitHub's CEO) announced in the keynote.",
        body: content,
        likes: 2,
        tag: "mac"
    },
    {
        slug: "i-made-a-silly-mistake-launching-nodeCLI.com",
        title: "I Made A Silly Mistake Launching NodeCLI.com",
        subtitle: "Step by step guide to becoming a modern front-end web developer.",
        featureImage: "https://images.unsplash.com/photo-1621880512780-d47a90bd58f4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
        description: "GitHub just announced Dark Mode at GitHub Universe 2020 conference. I'm super duper excited. Check out my reaction video and a couple of other excellent features Nat Friedman (GitHub's CEO) announced in the keynote.",
        body: content,
        likes: 23,
        tag: "software"
    },
    {
        slug: "web-purist",
        title: "Web Purist",
        subtitle: "Step by step guide to becoming a modern front-end web developer.",
        featureImage: "https://images.unsplash.com/photo-1621880512780-d47a90bd58f4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
        description: "GitHub just announced Dark Mode at GitHub Universe 2020 conference. I'm super duper excited. Check out my reaction video and a couple of other excellent features Nat Friedman (GitHub's CEO) announced in the keynote.",
        body: content,
        likes: 23,
        tag: "web"
    },
];
exports.default = posts;
//# sourceMappingURL=posts.js.map