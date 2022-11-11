import path from 'path';
import axios from 'axios';
import shortID from 'short-id';

export async function getFileFromUrlToBuffer(
  fileUrl: string,
  customFilename?: string
) {
  const response = await axios({
    method: 'get',
    url: fileUrl,
    responseType: 'arraybuffer',
  });

  const ext = path.extname(fileUrl).replace('.', '');
  const filename = customFilename
    ? `${customFilename}.${ext}`
    : `${shortID.generate()}.${ext}`;
  return {
    ext,
    filename,
    // @ts-ignore
    buffer: new Buffer.from(response.data),
  };
}
