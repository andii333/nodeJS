import { promises } from "fs";
export async function getFileStats(file) {
  try {
    const data = await promises.readFile(file, "utf8");
    const size = (await promises.stat(file)).size;
    const lines = data.split(/\r?\n/).length;
    return { file: file, size: size, lines: lines };
  } catch (error) {
    console.error(`Error reading file ${file}: ${error.message}`);
  }
}
