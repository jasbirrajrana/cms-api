import path from "path";
import { Storage } from "@google-cloud/storage";
export const storage = new Storage({
  keyFilename: path.join(
    __dirname,
    "../../jasbirrajranablog-cfafcde28b19.json"
  ),
  projectId: "jasbirrajranablog",
});

export const bucketName = storage.bucket("jasbirrajranablog");

// async function disableUniformBucketLevelAccess() {
//   // Disables uniform bucket-level access for the bucket
//   await storage.bucket("jasbirrajranablog").setMetadata({
//     iamConfiguration: {
//       uniformBucketLevelAccess: {
//         enabled: false,
//       },
//     },
//   });

//   console.log(`Uniform bucket-level access was disabled for ${bucketName}.`);
// }

// disableUniformBucketLevelAccess().catch(console.error);
