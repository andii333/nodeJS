import { findFilesInDirectory } from "./findFilesInDirectory.mjs";

function run(dir, ext) {
  if (!dir || !ext) {
    console.error("Usage: node script.js <directory> <extension>");
    process.exit(1);
  }

  findFilesInDirectory(dir, ext);
}

run("./", "txt");
