import sharp from 'sharp';
import { getFileFromUrlToBuffer } from '../getFileFromUrlToBuffer';
import { getCompressOptions } from '../image';

export async function getFileFromUrlToBufferWithCompress(
  fileUrl: string,
  compressWidth: number,
  customFilename?: string
) {
  const { buffer, filename } = await getFileFromUrlToBuffer(
    fileUrl,
    customFilename
  );
  const { type, options } = getCompressOptions(filename);

  const compressedBuffer = await sharp(buffer)
    .resize(compressWidth)
    [type](options)
    .toBuffer();

  return {
    compressedBuffer,
    filename,
  };
}
