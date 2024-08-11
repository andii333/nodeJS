// - Generate array of length 1E+6 containing corresponding range of numbers starting from the 1.
const array = Array.from({ length: 1e6 }, (_, i) => i + 1);
// console.log(array);

// - Implement memory measurement message for every 1sec.
// function monitorMemory() {
//   setInterval(() => {
//     const memoryUsage = process.memoryUsage();
//     console.log(
//       `Memory Usage: RSS = ${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`
//     );
//   }, 1000);
// }
// monitorMemory();

// - Implement function which accepts a string and returns its hash asynchronously. This function should be called for each element of the array.

const crypto = require("crypto");

function hashStringAsync(str) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    hash.update(str);
    resolve(hash.digest("hex"));
  });
}
// array.forEach(element => {
//     console.log(hashStringAsync(element.toString()));
// });

// - Implement npm script to process the array sequentially using “for” statement.
// async function processArraySequentiallyWithFor(array) {
//     for (let i = 0; i < array.length; i++) {
//         await hashStringAsync(array[i].toString());
//     }
// }

// async function runProcessArraySequentiallyWithFor() {
//     monitorMemory();
//     await processArraySequentiallyWithFor(array);
// }

// runProcessArraySequentiallyWithFor();

// - Implement npm script to process the array sequentially using function calls only (no loops).

// async function processArraySequentiallyWithRecursion(array, index = 0) {
//     if (index >= array.length) return;
//     await hashStringAsync(array[index].toString());
//     await processArraySequentiallyWithRecursion(array, index + 1);
// }

// async function runProcessArraySequentiallyWithRecursion() {
//   monitorMemory();
//   await processArraySequentiallyWithRecursion(array);
// }

// runProcessArraySequentiallyWithRecursion();

// - Implement npm script to process the array in batches sequentially. Choose the batch size on your own.

async function processArrayInBatches(array, batchSize) {
  for (let i = 0; i < array.length; i += batchSize) {
    const batch = array.slice(i, i + batchSize);
    await Promise.all(batch.map((num) => hashStringAsync(num.toString())));
  }
}

async function runProcessArrayInBatches() {
  monitorMemory();
  const batchSize = 100; // Choose your batch size
  await processArrayInBatches(array, batchSize);
}

runProcessArrayInBatches();

// - Memory measurement message must be displayed correctly accordingly to its specified time interval.
function monitorMemory() {
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
