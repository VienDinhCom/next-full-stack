#!/usr/bin/env npx --yes tsx

import fs from 'fs-extra';
import { Command, Option } from 'commander';
import { select, input } from '@inquirer/prompts';
import { kebabCase } from 'es-toolkit';
import { globbySync } from 'globby';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import pkg from './package.json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templateDir = path.join(__dirname, 'templates');
const templates = fs
  .readdirSync(templateDir)
  .map((name) => ({
    name,
    value: name,
    path: path.join(templateDir, name),
  }))
  .filter(({ path }) => fs.statSync(path).isDirectory());

const program = new Command();

program
  .name(pkg.name)
  .argument('[project-name]', 'Name of your project')
  .description('Build apps and libs with TypeScript following the ECMAScript standard.')
  .version(pkg.version)
  .addOption(new Option('-t, --template <template>', 'Choose a template').choices(templates.map(({ name }) => name)))
  .action(async (projectName: string | undefined, options: { template?: string }) => {
    // Prompt for project name if not provided
    const name = kebabCase(projectName || (await input({ message: 'Name your project:' })));

    // Prompt for template if not provided
    const templateName =
      options.template ||
      (await select({
        message: 'Select a template: ',
        choices: templates.map(({ name, value }) => ({ name, value })),
      }));

    const template = templates.find((t) => t.name === templateName);

    if (!template) {
      console.error('Template not found.');
      process.exit(1);
    }

    if (fs.pathExistsSync(name)) {
      console.log('The project directory already exists, so please choose another project name.');

      return;
    }

    fs.ensureDirSync(name);

    // Copy files from template to new project directory
    const templateFiles = globbySync(['**/*'], {
      cwd: template.path,
      gitignore: true,
      dot: true,
      onlyFiles: false,
    });

    for (const relPath of templateFiles) {
      const srcPath = path.join(template.path, relPath);
      const destPath = path.join(process.cwd(), name, relPath);

      if (fs.statSync(srcPath).isDirectory()) {
        fs.ensureDirSync(destPath);
        continue;
      }

      if (relPath === 'package.json') {
        const pkg = fs.readJsonSync(srcPath);
        fs.writeJsonSync(
          destPath,
          {
            ...pkg,
            name,
            description: undefined,
          },
          { spaces: 2 }
        );
        continue;
      }

      await fs.copy(srcPath, destPath);
    }

    console.log(`Project "${name}" created with template "${templateName}".`);

    console.log(`\n> cd ${name}`);

    console.log(`\n> npm install`);

    console.log(`\n> npm run dev`);
  });

program.parse(process.argv);
