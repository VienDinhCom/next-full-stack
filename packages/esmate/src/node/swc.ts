//@ts-ignore
import { swcDir } from '@swc/cli';

import fs from 'fs-extra';
import path from 'node:path';
import { projectDir } from '../shared/utils.js';

const config = fs.readFileSync(path.join(projectDir, 'tsconfig.json'), 'utf-8');

const swcOptions = {
  jsc: {
    target: 'esnext',
    externalHelpers: true
  },
  module: {
    type: 'es6'
  },
  sourceMaps: true
};

swcDir({
  cliOptions: {
    outDir: './dist',
    watch: true,
    filenames: ['./src'],
    extensions: ['.ts'],
    stripLeadingPaths: true
  },
  swcOptions,
  callbacks: {
    onSuccess: (e: any) => {
      console.log(e);
    },
    onFail: (e: any) => {
      console.log(e);
    },
    onWatchReady: () => {}
  }
});
