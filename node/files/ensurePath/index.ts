import * as fs from 'fs';
import { getFileName } from '../getFileName';

function isPathContainFile(anyPath: string): boolean {
  const lastPart = anyPath.split('/').reverse()[0];
  const extension = lastPart.match(/\.\w{2,4}/);

  return !!extension;
}

export async function ensurePath(anyPath: string): Promise<void> {
  return new Promise((res, rej) => {
    fs.stat(anyPath, err => {
      if (err?.code === 'ENOENT') {
        const isWithFile = isPathContainFile(anyPath);
        let dir = anyPath;

        if (isWithFile) {
          const filename = getFileName(anyPath);
          dir = anyPath.replace(`/${filename}`, '');

          fs.mkdirSync(dir, { recursive: true });
          fs.writeFileSync(anyPath, '');
        } else {
          fs.mkdirSync(dir, { recursive: true });
        }

        res();
      } else if (err) {
        rej(err);
      } else {
        res();
      }
    });
  });
}
