export function getFileName(filePath: string): string {
  return filePath.split('/').reverse()[0];
}
