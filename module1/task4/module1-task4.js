const fs = require("fs");
const path = require("path");
const faker = require("@faker-js/faker");
const { performance } = require("perf_hooks");

const rowLimit = 100000;

const outputFile = path.join(__dirname, "fake-data.csv");
const mbToBt = 1024 * 1024;
const memoryLimitMb = 80;

let currentFileSize = 0;
let rowCount = 0;
let lastMemoryCheck = performance.now();

function formatMemoryUsage(bytes) {
  return `${(bytes / mbToBt).toFixed(3)}MB`;
}

function displayMemoryUsage() {
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

function generateFakeData(rowNumber) {
  return [
    rowNumber,
    faker.faker.person.firstName(),
    faker.faker.person.lastName(),
    faker.faker.company.name(),
    faker.faker.location.streetAddress(),
    faker.faker.location.city(),
    faker.faker.location.country(),
    faker.faker.location.zipCode(),
    faker.faker.phone.number(),
    faker.faker.internet.email(),
    faker.faker.internet.url(),
  ].join(":");
}

function validateArguments(sizeLimit) {
  if (isNaN(sizeLimit) && isNaN(rowLimit)) {
    console.error(
      "Error: You must specify either a file size limit in MB or a row limit."
    );
    process.exit(1);
  }

  if (!isNaN(sizeLimit) && sizeLimit <= 0) {
    console.error("Error: File size limit must be greater than 0.");
    process.exit(1);
  }

  if (!isNaN(rowLimit) && rowLimit <= 0) {
    console.error("Error: Row limit must be greater than 0.");
    process.exit(1);
  }
}

async function writeFakeData(sizeLimit) {
  const writeStream = fs.createWriteStream(outputFile, { encoding: "utf8" });
  writeStream.write(
    "#:First Name:Last Name:Company:Address:City:Country:ZIP/Postal Code:Phone:Email:Web Link\n"
  );

  while (true) {
    rowCount++;
    const fakeData = generateFakeData(rowCount) + "\n";
    currentFileSize += Buffer.byteLength(fakeData);

    writeStream.write(fakeData);
    displayMemoryUsage();

    if (!isNaN(sizeLimit) && currentFileSize >= sizeLimit * mbToBt) {
      console.log(`File size limit of ${sizeLimit}MB reached.`);
      break;
    }

    if (!isNaN(rowLimit) && rowCount >= rowLimit) {
      console.log(`Row limit of ${rowLimit} rows reached.`);
      break;
    }
  }

  writeStream.end();
  console.log(`File generated successfully: ${outputFile}`);
}

function run(sizeLimit) {
  validateArguments(sizeLimit);
  writeFakeData(sizeLimit)
    .catch((err) => {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    });
}

run(1);
