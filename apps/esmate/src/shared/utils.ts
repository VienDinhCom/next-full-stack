import path from 'node:path';
import { findUpSync } from 'find-up';

export const projectDir = path.dirname(findUpSync('package.json') as string);
