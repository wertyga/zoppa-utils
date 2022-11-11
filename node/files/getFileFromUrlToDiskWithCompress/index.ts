import fs from 'fs';
import { getFileFromUrlToBufferWithCompress } from '../getFileFromUrlToBufferWithCompress';

export async function getFileFromUrlToDiskWithCompress(
  fileUrl: string,
  filePath: string,
  compressWith: number,
  customFilename?: string
) {
  const { compressedBuffer, filename } =
    await getFileFromUrlToBufferWithCompress(
      fileUrl,
      compressWith,
      customFilename
    );

  return fs.writeFileSync(`${filePath}/${filename}`, compressedBuffer);
}
