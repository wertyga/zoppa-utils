import fs from 'fs';

export default function writeToJson(path: string, data: any) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}
