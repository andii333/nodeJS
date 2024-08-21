import { createHash } from "crypto";
import { promisify } from "util";

export const asyncHash = promisify((data, callback) => {
  const hash = createHash("sha256");
  hash.update(data);
  callback(null, hash.digest("hex"));
});
