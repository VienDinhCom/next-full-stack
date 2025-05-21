import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import gitIgnore from 'eslint-config-flat-gitignore';
import { config as defineConfig } from 'typescript-eslint';
import globals from 'globals';

export function typescript() {
  return defineConfig(
    gitIgnore(),
    {
      languageOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        globals: { ...globals.node, ...globals.browser }
      }
    },
    eslint.configs.recommended,
    tseslint.configs.recommended
  );
}
