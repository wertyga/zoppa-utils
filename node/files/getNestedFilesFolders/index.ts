import fs from 'fs';

export default function getNestedFilesFolders(
  pathFolder: string,
  deep: number,
  filterFiles: string[] = []
) {
  const result = [];
  const entities = fs
    .readdirSync(pathFolder)
    .filter(ff => !filterFiles.includes(ff));
  const files = entities.filter(f =>
    fs.statSync(`${pathFolder}/${f}`).isFile()
  );
  const newEn = entities.filter(en => !files.includes(en));
  result.push(...files);
  if (deep === 0) {
    result.push(...newEn);
  } else {
    newEn.forEach(entity => {
      const tt = getNestedFilesFolders(
        `${pathFolder}/${entity}`,
        deep - 1,
        filterFiles
      );
      result.push(...tt);
    });
  }

  return result;
}
