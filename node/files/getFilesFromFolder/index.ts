import * as fs from 'fs';
import * as path from 'path';

export default function getFilesFromFolder(
  folderPath: string,
  filter: string[] = []
): { path: string; file: string }[] {
  const result = [];
  const entities = fs.readdirSync(folderPath);
  entities
    .filter(n => !filter.includes(n))
    .forEach(en => {
      const entityPath = path.join(folderPath, en);
      const isDirectory = fs.statSync(entityPath).isDirectory();
      if (isDirectory) {
        const files = getFilesFromFolder(entityPath, filter);
        result.push(...files);
      } else {
        result.push({
          file: en,
          path: `${folderPath}/${en}`,
        });
      }
    });

  return result;
}
