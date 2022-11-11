import fs from 'fs';

export default function writeToJson(path: string, data: any, local?: boolean) {
  const actualPath = local ? `${module.parent.path}/${path}` : path;
  try {
    fs.writeFileSync(actualPath, JSON.stringify(data, null, 2));
  } catch (e) {
    if (e.message.includes('ENOENT: no such file or directory')) {
      fs.writeFileSync(actualPath, JSON.stringify([], null, 2));
      return writeToJson(path, data, local);
    }
    throw e;
  }
}
