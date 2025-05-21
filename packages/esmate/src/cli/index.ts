#!/usr/bin/env node

import { Argument, Command } from 'commander';
import { confirm } from '@inquirer/prompts';

import { deves } from './deves.js';
import { lib } from './modes.js';
import {
  execSingly,
  execPkg,
  cmdArgs,
  execParallelly
} from '../shared/exec.js';
import { isJSONObject } from 'es-toolkit';
import process from 'node:process';
import { execPrettier } from '../prettier/index.js';
import { execEslint } from '../eslint/index.js';
import { watchFiles } from '../shared/files.js';

const program = new Command();

program
  .name(deves.name)
  .description(
    'Build apps and libs with TypeScript following the ECMAScript standard.'
  )
  .version(deves.version)
  .action(() => program.help());

program
  .command('run <script>')
  .description('Run a JavaScript or TypeScript program')
  .allowExcessArguments(true)
  .allowUnknownOption()
  .option('-h, --help')
  .action(async () => {
    execPkg(`tsx ${cmdArgs}`);
  });

program
  .command('task')
  .description('Run a task defined in the package.json')
  .addArgument(new Argument('<task>').choices(Object.keys(deves.tasks || {})))
  .option('-h, --help')
  .action(async (task: string) => {
    // https://www.npmjs.com/package/wireit
    // https://docs.deno.com/runtime/reference/cli/task/

    const taskArgs = process.argv.slice(4);
    const isParallel = isJSONObject(deves.tasks![task]);

    if (isParallel) {
      const tasks = deves.tasks as Record<string, Record<string, string>>;
      const commands = tasks[task];

      await execParallelly(commands);
    } else {
      const tasks = deves.tasks as Record<string, string>;
      const command = tasks[task];

      execSingly(command);
    }
  });

program
  .command('fmt [files]')
  .description('Format source files')
  .option('--check', 'Check if the source files are formatted')
  // .option(
  //   '--watch',
  //   'Watch for file changes and restart process automatically.'
  // )
  .action(
    async (files: string, options: { check: boolean; watch: boolean }) => {
      const args: string[] = [];

      if (options.check) {
        args.push('--check');
      } else {
        args.push('--write');
      }

      execPrettier(files || '.', args.join(' '));

      // if (options.watch) {
      //   const watcher = await watchFiles(files || '.');

      //   watcher.on('change', (file) => {
      //     execPrettier(file, args.join(' '));
      //   });
      // }
    }
  );

program
  .command('lint [files]')
  .description('Lint source files')
  .option('--fix', 'Fix any linting errors for rules that support it')
  // .option(
  //   '--watch',
  //   'Watch for file changes and restart process automatically.'
  // )
  .action(async (files: string, options: { fix: boolean; watch: boolean }) => {
    const args: string[] = [];

    if (options.fix) {
      args.push('--fix');
    }

    execEslint(files || '.', args.join(' '));

    // if (options.watch) {
    //   const watcher = await watchFiles(files || '.');

    //   watcher.on('change', (file) => {
    //     execEslint(file, args.join(' '));
    //   });
    // }
  });

switch (deves.mode) {
  case 'lib':
    lib(program);
    break;
}

program
  .command('outdated')
  .description('Find and update outdated dependencies')
  .allowExcessArguments(true)
  .allowUnknownOption()
  .option('-h, --help')
  .action(async (option, command) => {
    const answer = await confirm({
      message: 'Do you want to update to the latest packages?',
      default: false
    });

    const target = answer ? 'latest' : 'semver';

    execPkg(`npm-check-updates --interactive --target ${target}`);

    // const flags = ['-i', '--interactive'];

    // if (flags.some((flag) => cmdArgs.includes(flag))) {
    //   const answer = await confirm({
    //     message: 'Do you want to update to the latest packages?',
    //     default: false
    //   });

    //   const target = answer ? 'latest' : 'semver';

    //   execPkg(`npm-check-updates --interactive --target ${target}`);
    // } else {
    //   execPkg(`npm-check-updates ${cmdArgs}`);
    // }
  });

program.parse(process.argv);
