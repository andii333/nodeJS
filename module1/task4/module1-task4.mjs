import { writeFakeData } from "./writeFakeData.mjs";
import { validateArguments } from "./validateArguments.mjs";

function run(limit, type) {
  validateArguments(limit, type);
  writeFakeData(limit, type).catch((err) => {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  });
}

const args = process.argv.slice(2);

if (args[0].includes("sizeLimit=")) {
  const size = args[0].match(/sizeLimit=(\d+\s?\d*)/);
  run(size[1], 'size');
} else
if (args[0].includes("rowLimit=")) {
  const rows = args[0].match(/rowLimit=(\d+\s?\d*)/);
  run(rows[1], 'row');
} else {
  errorMessage();
}

function errorMessage() {
  console.log("Not valid argument");
}
