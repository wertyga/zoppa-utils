// @ts-ignore
import fs from 'fs';

export function writeToJson(path: string, data: any) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}
