
import { writeFakeData } from "./writeFakeData.mjs";
import { validateArguments } from "./validateArguments.mjs";

function run(sizeLimit) {
  validateArguments(sizeLimit);
  writeFakeData(sizeLimit)
    .catch((err) => {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    });
}

run(1);