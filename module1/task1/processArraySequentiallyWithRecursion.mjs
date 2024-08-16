// - Implement npm script to process the array sequentially using function calls only (no loops).
import { array } from "./generateArray.mjs"; 
import { monitorMemory } from "./implementMemoryMeasurement.mjs";
function processItem(item) {
  return new Promise((resolve) => {
    console.log(`Processing item: ${item}`);
    resolve();
  });
}
function processArraySequentially(arr, index = 0) {
  if (index >= arr.length) {
    console.log("All items processed");
    return;
  }
  
  processItem(arr[index]).then(() => {
    processArraySequentially(arr, index + 1);
  });
}

monitorMemory();
processArraySequentially(array);
