import { readDirectoryRecursively } from "./readDirectoryRecursively.mjs";
import { getFileStats } from "./getFileStats.mjs";
export async function findFilesInDirectory(dir, ext) {
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
