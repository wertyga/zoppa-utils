import path from 'path';

export function getCompressOptions(filename) {
  const ext = path.extname(filename);
  switch (ext) {
    case '.jpeg':
    case '.jpg': {
      return {
        type: 'jpeg',
        options: { mozjpeg: true },
      };
    }
    case '.png': {
      return {
        type: 'png',
      };
    }
  }
}
