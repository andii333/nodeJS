import { createWriteStream } from "fs";
import { generateFakeData } from "./generateFakeData.mjs";
import { displayMemoryUsage } from "./displayMemoryUsage.mjs";
import { join } from "path";
import { fileURLToPath } from "url";
import { mbToBt } from "./displayMemoryUsage.mjs";

let currentFileSize = 0;
let rowCount = 0;
let buffer = "";
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");
const outputFile = join(__dirname, "fake-data.csv");

export async function writeFakeData(limit, type) {
  const writeStream = createWriteStream(outputFile, { encoding: "utf8" });
  writeStream.write(
    "#:First Name:Last Name:Company:Address:City:Country:ZIP/Postal Code:Phone:Email:Web Link\n"
  );

  while (true) {
    rowCount++;
    const fakeData = generateFakeData(rowCount) + "\n";
    currentFileSize += Buffer.byteLength(fakeData);
    buffer += fakeData;

    if (rowCount % 100 === 0) {
      writeStream.write(buffer);
      buffer = "";
      displayMemoryUsage();
    }

    if (type === "size" && !isNaN(limit) && currentFileSize >= limit * mbToBt) {
      console.log(`File size limit of ${limit}MB reached.`);
      break;
    }
    
    if (type === "row" && !isNaN(limit) && rowCount >= limit) {
      console.log(`Row limit of ${limit} rows reached.`);
      break;
    }
  }

  if (buffer) {
    writeStream.write(buffer);
  }

  writeStream.end();
  console.log(`File generated successfully: ${outputFile}`);
}
