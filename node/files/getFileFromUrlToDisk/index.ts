import fs from 'fs';
import { getFileFromUrlToBuffer } from '../getFileFromUrlToBuffer';

export async function getFileFromUrlToDisk(
  fileUrl: string,
  filePath: string,
  customFilename?: string
) {
  const { buffer, filename } = await getFileFromUrlToBuffer(
    fileUrl,
    customFilename
  );

  return fs.writeFileSync(`${filePath}/${filename}`, buffer);
}
