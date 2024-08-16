// - Implement npm script to process the array in batches sequentially. Choose the batch size on your own.
import {array} from './generateArray.mjs'; 
import { monitorMemory } from "./implementMemoryMeasurement.mjs";
const batchSize = 3;

function processItem(item) {
  return new Promise((resolve) => {
    console.log(`Processing item: ${item}`);
    resolve();
  });
}

async function processBatch(batch) {
  const promises = batch.map((item) => processItem(item));
  await Promise.all(promises);
}

async function processArrayInBatches(arr, batchSize) {
  for (let i = 0; i < arr.length; i += batchSize) {
    const batch = arr.slice(i, i + batchSize);
    await processBatch(batch);
    console.log(`Batch ${i / batchSize + 1} processed`);
  }
  console.log("All items processed");
}

monitorMemory();
processArrayInBatches(array, batchSize);