import { Config as PrettierConfig } from 'prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier/flat';
import { Merge } from 'type-fest';
import type { PluginOptions as TailwindOptions } from 'prettier-plugin-tailwindcss';

import { config as defineConfig } from 'typescript-eslint';
import getUserConfig from '../prettier/config.js';
import { uniq } from 'es-toolkit';

type Config = Merge<PrettierConfig, TailwindOptions>;

export function prettier(config: Config) {
  if (config.plugins) {
    throw Error('Do not add Prettier plugins in ESlint.');
  }

  if (config.overrides) {
    throw Error('Do not override Prettier in ESlint.');
  }

  const userConfig = getUserConfig();
  const userPlugins = userConfig.plugins || [];
  const defaultPlugins = ['deves/prettier/plugins/tailwind'];

  return defineConfig(
    {
      plugins: {
        prettier: prettierPlugin
      },
      rules: {
        'prettier/prettier': [
          'warn',
          {
            ...userConfig,
            plugins: uniq([...userPlugins, ...defaultPlugins]),
            ...config
          } satisfies Config
        ]
      }
    },
    prettierConfig
  );
}
