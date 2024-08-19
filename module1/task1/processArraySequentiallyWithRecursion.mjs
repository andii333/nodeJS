import { array } from "./generateArray.mjs";
import { monitorMemory } from "./implementMemoryMeasurement.mjs";

function processItem(item) {
  return new Promise((resolve) => {
    console.log(`Processing item: ${item}`);
    setImmediate(() => resolve());
  });
}

function processArraySequentially(arr, index = 0, intervalId) {
  if (index >= arr.length) {
    console.log("All items processed");
    console.timeEnd("Processes calculated in");

    clearInterval(intervalId);
    return;
  }

  processItem(arr[index]).then(() => {
    processArraySequentially(arr, index + 1, intervalId);
  });
}

function startProcesses() {
  console.time("Processes calculated in");

  console.log("Starting memory monitoring...");
  const intervalId = monitorMemory();

  console.log("Starting processes...");
  processArraySequentially(array, 0, intervalId);
}

startProcesses();
