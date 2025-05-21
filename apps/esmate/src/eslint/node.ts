import { config as defineConfig } from 'typescript-eslint';
import { typescript } from './typescript.js';
import nodePlugin from 'eslint-plugin-n';

export function node() {
  return defineConfig(
    typescript(),
    nodePlugin.configs['flat/recommended-module'],
    {
      rules: {
        'n/no-missing-import': 'off',
        'n/prefer-node-protocol': 'error'
      }
    }
  );
}
