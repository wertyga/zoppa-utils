import fs from 'fs';

export default function appendToJson(path: string, data: any, local = false) {
  const actualPath = local ? `${module.parent.path}/${path}` : path;
  try {
    const jsonArr = JSON.parse(fs.readFileSync(actualPath, 'utf8'));
    fs.writeFileSync(
      actualPath,
      JSON.stringify(
        Array.isArray(data) ? [...jsonArr, ...data] : [...jsonArr, data],
        null,
        2
      )
    );
  } catch (e) {
    if (e.message.includes('ENOENT: no such file or directory')) {
      fs.writeFileSync(actualPath, JSON.stringify([], null, 2));
      return appendToJson(path, data, local);
    }
    throw e;
  }
}
