import { Command } from 'commander';

//@ts-ignore
import { swcDir } from '@swc/cli';

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
