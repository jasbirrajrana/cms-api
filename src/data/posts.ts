import * as fs from "fs";
// const __dirname = path.resolve();
console.log("---->data-->post.ts---->__dirname", `${__dirname}`);

const content = fs.readFileSync(`${__dirname}/post.md`, "utf-8");
console.log(content);

const posts = [
  {
    slug: "github-dark-mode",
    title: "Github Dark Mode",
    subtitle:
      "Step by step guide to becoming a modern front-end web developer.",
    featureImage:
      "https://images.unsplash.com/photo-1621880512780-d47a90bd58f4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    description:
      "GitHub just announced Dark Mode at GitHub Universe 2020 conference. I'm super duper excited. Check out my reaction video and a couple of other excellent features Nat Friedman (GitHub's CEO) announced in the keynote.",
    body: content,
    likes: 10,
    tag: "git"
  },

  {
    slug: "screencasting-tip-auto-hide-cursor-on-macOS",
    title: "Screencasting Tip: Auto Hide Cursor on macOS",
    subtitle:
      "Step by step guide to becoming a modern front-end web developer.",

    featureImage:
      "https://images.unsplash.com/photo-1621880512780-d47a90bd58f4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",

    description:
      "GitHub just announced Dark Mode at GitHub Universe 2020 conference. I'm super duper excited. Check out my reaction video and a couple of other excellent features Nat Friedman (GitHub's CEO) announced in the keynote.",
    body: content,
    likes: 2,
    tag: "mac"
  },

  {
    slug: "i-made-a-silly-mistake-launching-nodeCLI.com",
    title: "I Made A Silly Mistake Launching NodeCLI.com",
    subtitle:
      "Step by step guide to becoming a modern front-end web developer.",

    featureImage:
      "https://images.unsplash.com/photo-1621880512780-d47a90bd58f4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",

    description:
      "GitHub just announced Dark Mode at GitHub Universe 2020 conference. I'm super duper excited. Check out my reaction video and a couple of other excellent features Nat Friedman (GitHub's CEO) announced in the keynote.",
    body: content,
    likes: 23,
    tag: "software"
  },

  {
    slug: "web-purist",
    title: "Web Purist",
    subtitle:
      "Step by step guide to becoming a modern front-end web developer.",

    featureImage:
      "https://images.unsplash.com/photo-1621880512780-d47a90bd58f4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",

    description:
      "GitHub just announced Dark Mode at GitHub Universe 2020 conference. I'm super duper excited. Check out my reaction video and a couple of other excellent features Nat Friedman (GitHub's CEO) announced in the keynote.",
    body: content,
    likes: 23,
    tag: "web"
  },
];

export default posts;
