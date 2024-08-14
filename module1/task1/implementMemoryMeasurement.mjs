// - Implement memory measurement message for every 1sec.
export function monitorMemory() {
  setInterval(() => {
    const memoryUsage = process.memoryUsage();
    console.log(
      `Memory Usage: RSS = ${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`
    );
  }, 1000);
}
monitorMemory();