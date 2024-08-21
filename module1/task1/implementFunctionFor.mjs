// - Implement function which accepts a string and returns its hash asynchronously. This function should be called for each element of the array.

import { array } from "./generateArray.mjs";
import { monitorMemory } from "./implementMemoryMeasurement.mjs";
import { asyncHash } from "./asyncHash.mjs";

async function hashArrayElements(array) {
  for (const element of array) {
    const hash = await asyncHash(element.toString());
    console.log(`Hash of ${element}: ${hash}`); // вивід у консольлог хеш-елементів
    await new Promise((resolve) => setImmediate(resolve));
  }
}

async function startProcesses() {
  console.time("Hashes calculated in");

  console.log("Starting memory monitoring...");
  const intervalId = monitorMemory();

  console.log("Starting array hashing...");
  await hashArrayElements(array);

  console.log("Stopping memory monitoring...");
  clearInterval(intervalId);

  console.timeEnd("Hashes calculated in");
}

startProcesses();