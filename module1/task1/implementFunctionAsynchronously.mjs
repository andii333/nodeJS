// - Implement function which accepts a string and returns its hash asynchronously. This function should be called for each element of the array.
import { array } from "./generateArray.mjs"; 
import { createHash } from "crypto";
import { monitorMemory } from "./implementMemoryMeasurement.mjs";

export function hashStringAsync(str) {
  return new Promise((resolve, reject) => {
    const hash = createHash("sha256");
    hash.update(str);
    resolve(hash.digest("hex"));
  });
}
function run() {
  array.forEach(element => {
    console.log(hashStringAsync(element.toString()));
  });
}
monitorMemory();
run();
