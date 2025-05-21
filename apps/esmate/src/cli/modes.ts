import { Command } from 'commander';
import { deves } from './deves.js';
import { execSingly } from '../shared/exec.js';

export function app(program: Command) {}

export function lib(program: Command) {
  program
    .command('dev')
    .description('watch and build')
    .allowExcessArguments(true)
    .allowUnknownOption()
    .option('-h, --help')
    .action(async () => {
      deves.build();

      execSingly('tsc --watch');

      // https://www.npmjs.com/package/glob-watcher
      // watch files to fix and format
    });
}
