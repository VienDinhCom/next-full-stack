import { ESLint } from 'eslint';
import { execSingly, mergeArgs } from '../shared/exec.js';

export function execEslint(files: string, args: string = '') {
  execSingly(
    `eslint --cache --cache-location './node_modules/.cache/eslint/.eslint-cache' ${mergeArgs(args, files)}`
  );
}

export async function getMatchedFiles(patterns: string) {
  const eslint = new ESLint();
  const files = await eslint.lintFiles(patterns);

  return files.map(({ filePath }) => filePath);
}

export { globalIgnores } from 'eslint/config';
export { config as defineConfig } from 'typescript-eslint';

export { node } from './node.js';
export { react } from './react.js';
export { prettier } from './prettier.js';
export { typescript } from './typescript.js';
