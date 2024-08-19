// - Implement memory measurement message for every 1sec.
export function monitorMemory() {
  const intervalId = setInterval(() => {
    const memoryUsage = process.memoryUsage();
    console.log(`Memory Usage: RSS = ${memoryUsage.rss / 1024 / 1024} MB,`);
  }, 1000);
  return intervalId;
}
