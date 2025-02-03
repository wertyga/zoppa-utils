import { copyFile, unlink, readdir } from 'node:fs/promises';
import { ensurePath } from '../ensurePath';

export const renameFile = async (
  filePath: string,
  newFilePath: string,
  removePrevious?: boolean
): Promise<void> => {
  await ensurePath(newFilePath);
  await copyFile(filePath, newFilePath);

  if (removePrevious) {
    await unlink(filePath);
  }
};

export async function renameFilesBunch(
  filesFolderPath: string,
  newFilesFolderPath: string,
  removePrevious?: boolean,
  filterFoFiles: (file: string) => boolean = () => true,
  onProcess?: (file: string) => void
): Promise<void> {
  const files = await readdir(filesFolderPath).then(files => {
    return files.filter(filterFoFiles);
  });

  for (let i = 0; i < files.length; i++) {
    await renameFile(
      `${filesFolderPath}/${files[i]}`,
      `${newFilesFolderPath}/${files[i]}`,
      removePrevious
    );

    if (onProcess) onProcess(`${newFilesFolderPath}/${files[i]}`);
  }
}
