// - Implement npm script to process the array sequentially using “for” statement.
import { array } from "./generateArray.mjs"; 
import { monitorMemory } from "./implementMemoryMeasurement.mjs";
function processItem(item) {
  return new Promise((resolve) => {
    console.log(`Processing item: ${item}`);
    setImmediate(() => resolve());
  });
}
async function processArraySequentially(arr) {
  for (let i = 0; i < arr.length; i++) {
     await processItem(arr[i]);
  }
  console.log("All items processed");
}

async function startProcesses() {
  console.time("Processes calculated in");

  console.log("Starting memory monitoring...");
  const intervalId = monitorMemory();

  console.log("Starting processes...");
  await processArraySequentially(array);

  console.log("Stopping memory monitoring...");
  clearInterval(intervalId);

  console.timeEnd("Processes calculated in");
}
startProcesses();

