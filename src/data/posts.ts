import * as fs from "fs";
// const __dirname = path.resolve();
console.log("---->data-->post.ts---->__dirname", `${__dirname}`);

const content = fs.readFileSync(`${__dirname}/post.md`, "utf-8");
console.log(content);

const posts = [
  {
    slug: "Merge-Sort-Algorithm",
    title: "Merge Sort Algorithm",
    subtitle: "Implementation of merge sort using JavaScript",
    featureImage:
      "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/72bb37e7-46c2-4407-9e49-c651e61f3327/merge-sort-eg.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210622%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210622T143535Z&X-Amz-Expires=86400&X-Amz-Signature=eb72d2a243f0bdebbf7b3e33264763368aecf492bc1c4a5627adc88e8fe26542&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22merge-sort-eg.jpg%22",
    description:
      "Merge sort is one of the most efficient sorting algorithms. It works on the principle of Divide and Conquer. Merge sort repeatedly breaks down a list into several sublists until each sublist consists of a single element and merging those sublists in a manner that results in a sorted list",
    body: content,
    likes: 10,
    tag: "Algorithm",
  },
];

export default posts;
