export function monitorMemoryCheck() {
  let lastCheck = Date.now();

  function checkMemoryUsage() {
    setInterval(() => {
      const now = Date.now();
      if (now - lastCheck >= 1000) {
        const memoryUsage = process.memoryUsage();
        console.log(
          `Memory Usage: RSS = ${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`
        );
        lastCheck = now;
      }
    }, 1000);
  }

  checkMemoryUsage();
}
