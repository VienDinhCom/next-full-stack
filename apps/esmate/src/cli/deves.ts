import { z } from 'zod';
import path from 'node:path';
import { globbySync } from 'globby';
import { findUpSync } from 'find-up';
import fs from 'fs-extra';
import { kebabCase } from 'es-toolkit';

class DevES {
  private schema = z.object({
    name: z.string(),
    version: z.string(),
    private: z.literal(true),
    deves: z.enum(['lib', 'react']),
    type: z.literal('module'),
    main: z.undefined({
      message: 'The "main" field is not needed for ESM projects.'
    }),
    module: z.undefined({
      message: 'The "module" field is not needed for ESM projects.'
    }),
    scripts: z.record(z.string(), z.string()).optional(),
    bin: z
      .record(
        z.string(),
        z
          .string()
          .refine(
            (value) => fs.existsSync(value),
            (value) => ({
              message: 'No file matches this bin value: ' + value
            })
          )
          .refine(
            (value) => value.startsWith('./src/'),
            () => ({
              message: 'A bin value must start with ./src/'
            })
          )
      )
      .optional(),
    exports: z
      .record(
        z
          .string()
          .refine(
            (key) => this.exports[key].replace('src/', '').startsWith(key),
            {
              message: 'An export value must be prefixed by its own key.'
            }
          )
          .refine(
            (key) => key.startsWith('./'),
            () => ({
              message: 'An export key must start with ./'
            })
          ),
        z
          .string()
          .refine(
            (value) => !value.includes('**'),
            (value) => ({
              message:
                'Avoid cross-directory matching in this export value: ' + value
            })
          )
          .refine(
            (value) => value.startsWith('./src/'),
            () => ({
              message: 'An export value must start with ./src/'
            })
          )
          .refine(
            (value) => globbySync(value).length > 0,
            (value) => ({
              message: 'No file matches this export value: ' + value
            })
          )
      )
      .optional(),
    files: z
      .array(
        z.string().refine(
          (value) => globbySync(value).length > 0,
          (value) => ({
            message: 'No file matches this include value: ' + value
          })
        )
      )
      .optional(),

    tasks: z
      .record(
        z.string().refine((key) => key === kebabCase(key), {
          message: 'A task command must be kebab case'
        }),
        z.union([
          z.string(),
          z.record(
            z.string().refine((key) => key === kebabCase(key), {
              message: 'A task command must be kebab case'
            }),
            z.string()
          )
        ])
      )
      .optional()
  });

  private path: string = findUpSync('package.json')!;
  private package: z.infer<typeof this.schema> = fs.readJSONSync(this.path);
  private exports: Record<string, string> = this.package.exports || {};
  public name = 'deves';

  constructor() {
    if (process.argv[2] !== 'init') {
      this.schema.parse(this.package);
    }
  }

  public get mode() {
    return this.package.deves;
  }

  public get version() {
    return this.package.version;
  }

  public get tasks() {
    return this.package.tasks;
  }

  private write() {
    const { dir, base } = path.parse(this.path);

    const newPackage = {
      ...this.package,
      files: undefined,
      scripts: undefined,
      private: undefined,
      devDependencies: undefined,
      bin: (() => {
        const newBin: Record<string, string> = {};

        for (const key in this.package.bin) {
          const value: string = this.package.bin[key];
          const { dir, name } = path.parse(value);

          newBin[key] = `${dir}/${name}.js`;
        }

        return newBin;
      })(),
      exports: (() => {
        const newExports: Record<string, { import: string; types: string }> =
          {};

        for (const key in this.package.exports) {
          const value: string = this.package.exports[key];
          const { dir, name } = path.parse(value);
          const out = `${dir}/${name}`;

          newExports[key] = {
            import: out + '.js',
            types: out + '.d.ts'
          };
        }

        return newExports;
      })()
    };

    const newPath = path.join(dir, 'dist', base);

    fs.ensureFileSync(newPath);
    fs.writeJsonSync(newPath, newPackage, { spaces: 2 });
  }

  private async includeFiles() {
    for (const filePath of globbySync(this.package.files || [], {
      gitignore: true
    })) {
      await fs.copy(filePath, path.join('./dist', filePath));
    }
  }

  public build() {
    this.write();
    this.includeFiles();
  }
}

export const deves = new DevES();
