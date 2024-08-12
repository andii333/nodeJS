const fs = require("fs");
const path = require("path");

async function readDirectoryRecursively(dir, ext) {
  const files = [];
  const items = await fs.promises.readdir(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      const subFiles = await readDirectoryRecursively(fullPath, ext);
      files.push(...subFiles);
    } else if (item.isFile() && fullPath.endsWith(ext)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function getFileStats(file) {
  try {
    const data = await fs.promises.readFile(file, "utf8");
    const size = (await fs.promises.stat(file)).size;
    const lines = data.split(/\r?\n/).length;
    return  `file: ${file}, size: ${size}, lines: ${lines}` 
   } catch (error) {
    console.error(`Error reading file ${file}: ${error.message}`);
  }
}

async function findFilesInDirectory(dir, ext) {
  try {
    const files = await readDirectoryRecursively(dir, ext);
    const statsPromises = files.map(getFileStats);
    const stats = (await Promise.all(statsPromises)).filter(Boolean);
    stats.sort((a, b) => b.size - a.size);

    stats.forEach(({ file, size, lines }) => {
      console.log(`File: ${file}, Size: ${size} bytes, Lines: ${lines}`);
    });
  } catch (error) {
    console.error(`Error processing directory ${dir}: ${error.message}`);
  }
}

function run() {
  const [dir, ext] = process.argv.slice(2);

  if (!dir || !ext) {
    console.error("Usage: node script.js <directory> <extension>");
    process.exit(1);
  }

  findFilesInDirectory(dir, ext);
}

run();
