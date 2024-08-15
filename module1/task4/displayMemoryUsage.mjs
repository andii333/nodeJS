import { performance } from "perf_hooks";

export const mbToBt = 1024 * 1024;
const memoryLimitMb = 80;
let lastMemoryCheck = performance.now();
function formatMemoryUsage(bytes) {
  return `${(bytes / mbToBt).toFixed(3)}MB`;
}

export function displayMemoryUsage() {
  const memoryUsed = process.memoryUsage().heapUsed;
  const currentTime = performance.now();

  if (currentTime - lastMemoryCheck >= 5000) {
    console.log(`Memory used: ${formatMemoryUsage(memoryUsed)}`);
    lastMemoryCheck = currentTime;

    if (memoryUsed > memoryLimitMb * mbToBt) {
      console.error("Memory limit exceeded. Exiting...");
      process.exit(1);
    }
  }
}
