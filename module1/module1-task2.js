const { performance } = require("perf_hooks");

let lastExecutionTime = performance.now();

function formatMemoryUsage(bytes) {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let unitIndex = 0;

  while (bytes >= 1024 && unitIndex < units.length - 1) {
    bytes /= 1024;
    unitIndex++;
  }

  return `${bytes.toFixed(2)}${units[unitIndex]}`;
}

function displayMemoryUsage() {
  const currentMemoryUsage = process.memoryUsage().heapUsed;
  const currentTime = performance.now();
  const timeSpent = (currentTime - lastExecutionTime) / 1000;
  lastExecutionTime = currentTime;

  console.log(
    `Memory used: ${formatMemoryUsage(currentMemoryUsage)} (${timeSpent.toFixed(
      3
    )}sec)`
  );
}

console.log("Starting memory monitoring...");

const interval = setInterval(displayMemoryUsage, 1000);

setTimeout(() => {
  clearInterval(interval);
  console.log("Finished");
  process.exit(0);
}, 5000);
