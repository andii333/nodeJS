
import { writeFakeData } from "./writeFakeData.mjs";
import { validateArguments } from "./validateArguments.mjs";

function run(sizeLimit, rowLimit) {
  validateArguments(sizeLimit, rowLimit);
  writeFakeData(sizeLimit).catch((err) => {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  });
}

run(5, 1000000);