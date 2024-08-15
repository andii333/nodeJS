import { createWriteStream } from "fs";
import { generateFakeData } from "./generateFakeData.mjs";
import { displayMemoryUsage } from "./displayMemoryUsage.mjs";
import { join } from "path";
import { fileURLToPath } from "url";
import { mbToBt } from "./displayMemoryUsage.mjs";
import { rowLimit } from "./validateArguments.mjs";

// Get the current file's directory
let currentFileSize = 0;
let rowCount = 0;
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");
const outputFile = join(__dirname, "fake-data.csv");

export async function writeFakeData(sizeLimit) {
  const writeStream = createWriteStream(outputFile, { encoding: "utf8" });
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
