import { join } from "path";
import { promises } from "fs";
export async function readDirectoryRecursively(dir, ext) {
  const files = [];
  const items = await promises.readdir(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = join(dir, item.name);

    if (item.isDirectory()) {
      const subFiles = await readDirectoryRecursively(fullPath, ext);
      files.push(...subFiles);
    } else if (item.isFile() && fullPath.endsWith(ext)) {
      files.push(fullPath);
    }
  }

  return files;
}
