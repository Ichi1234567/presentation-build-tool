import { readdir, stat } from 'fs/promises'

export default async function getPresentaions(folders) {
  const dirs = await Promise.all(folders.map(async function(folder) {
    const files = await readdir(`${folder}/src`, { withFileTypes: true })

    return files.filter(dir => dir.isDirectory())
      .map(dir => {
        return [folder, 'src', dir.name].join('/');
      });
  }));

  const dirsWithState = await Promise.all(
    dirs.flat().map(async function(folder) {
      const state = await stat(folder);

      return {
        path: folder,
        mtimeMs: state.mtimeMs,
      };
  }));

  return dirsWithState.sort((a, b) => (b.mtimeMs - a.mtimeMs)).map(x => x.path);
}
