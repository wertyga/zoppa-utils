export function readStreamToBuffer(readStream) {
  return new Promise(res => {
    const data = [];
    readStream.on('data', chunk => {
      data.push(chunk);
    });
    readStream.on('end', function () {
      res(Buffer.concat(data));
    });
  });
}
