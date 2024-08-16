// - Implement npm script to process the array sequentially using “for” statement.
import { array } from "./generateArray.mjs"; 
import { monitorMemory } from "./implementMemoryMeasurement.mjs";
function processItem(item) {
  return new Promise((resolve) => {
    console.log(`Processing item: ${item}`);
    resolve();
  });
}
async function processArraySequentially(arr) {
  for (let i = 0; i < arr.length; i++) {
    await processItem(arr[i]);
  }
  console.log("All items processed");
}

monitorMemory();
processArraySequentially(array);