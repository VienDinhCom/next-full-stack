import fs from 'fs-extra';
import chokidar, { ChokidarOptions } from 'chokidar';
import ignore from 'ignore';
import path from 'node:path';
import { projectDir } from './utils.js';

export async function readFileIfExists(filePath: string) {
  const exists = await fs.pathExists(filePath);

  if (exists) {
    return fs.readFile(filePath, 'utf8');
  } else {
    return null;
  }
}

export async function watchFiles(
  files: string | string[],
  options?: ChokidarOptions
) {
  // const ig = ignore();
  // const gitignore = await readFileIfExists(path.join(projectDir, '.gitignore'));

  // if (gitignore) ig.add(gitignore);

  return chokidar.watch(files, {
    // ignored: (path) => ig.ignores(path),
    persistent: true,
    ignoreInitial: true,
    ...options
  });
}
