import { Config } from 'prettier';
import fs from 'fs-extra';
import { uniq, cloneDeep } from 'es-toolkit';
import getUserConfig, { defaultConfig } from './config.js';
import { cmdArgs, execSingly, mergeArgs } from '../shared/exec.js';

export function defineConfig(...configs: Config[]): Config {
  const result = cloneDeep(defaultConfig);

  for (const config of configs) {
    for (const key in config) {
      const value = config[key];

      if (key === 'plugins') {
        const existingPlugins = result.plugins || [];
        const newPlugins = (value as Config['plugins']) || [];

        result.plugins = uniq([...existingPlugins, ...newPlugins]);
      } else if (key === 'overrides') {
        const existingOverrides = result.overrides || [];
        const newOverrides = (value as Config['overrides']) || [];

        result.overrides = [...existingOverrides, ...newOverrides];
      } else {
        result[key] = value;
      }
    }
  }

  return cloneDeep(result);
}

export function globalIgnores(ignorePatterns: string[]) {
  return defineConfig({
    overrides: [
      {
        files: ignorePatterns,
        options: {
          requirePragma: true
        }
      }
    ]
  });
}

export function execPrettier(files: string, args: string = '') {
  execSingly(`prettier --ignore-unknown --cache ${mergeArgs(args, files)}`);
}
