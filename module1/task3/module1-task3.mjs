import { findFilesInDirectory } from "./findFilesInDirectory.mjs";

function run(dir, ext) {
  if (!dir || !ext) {
    console.error("Usage: node script.js <directory> <extension>");
    process.exit(1);
  }

  findFilesInDirectory(dir, ext);
}


const args = process.argv.slice(2);

if (args[0].includes("way=") && args[1].includes("type=")) {
  const way = args[0].match(/way=(.*)/);
  const type = args[1].match(/type=(.*)/);
  run(way[1], type[1]);
} else {
  console.log("Not valid argument");
}
