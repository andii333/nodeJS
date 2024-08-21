// - Implement npm script to process the array in batches sequentially. Choose the batch size on your own.
import {array} from './generateArray.mjs'; 
import { monitorMemory } from "./implementMemoryMeasurement.mjs";
import { asyncHash } from "./asyncHash.mjs";

const batchSize = 3;

function processArrayInBatches(array, batchSize) {
    return new Promise((resolve) => {
        let index = 0;
        async function processNextBatch() {
            if (index < array.length) {
                const batch = array.slice(index, index + batchSize);
                const hash = await asyncHash(index.toString());
                console.log(`Processing batch:' ${batch} 'hash:' ${hash}` );
                index += batchSize;
                setImmediate(processNextBatch);
            } else {
                resolve();
            }
        }
        processNextBatch();
    });
}
async function startProcesses() {
  console.time("Batches calculated in");

  console.log("Starting memory monitoring...");
  const intervalId = monitorMemory();

  console.log("Starting array batches...");
  await processArrayInBatches(array, batchSize);

  console.log("Stopping memory monitoring...");
  clearInterval(intervalId);

  console.timeEnd("Batches calculated in");
}
startProcesses();