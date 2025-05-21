import { spawnSync } from 'node:child_process';
import concurrently, { ConcurrentlyCommandInput } from 'concurrently';

export const cmdArgs = process.argv.slice(3).join(' ');

export function mergeArgs(...args: string[]) {
  return args.reduce((prev, curr) => prev + ' ' + curr).trim();
}

export function execSingly(command: string) {
  const res = spawnSync(command, {
    shell: true,
    stdio: 'inherit',
    env: process.env
  });

  if (res.error) {
    console.log(res.error.message);
    process.exit(1);
  }

  if (res.status !== 0) {
    process.exit(res.status);
  }
}

export function execPkg(command: string) {
  execSingly('npx ' + command);
}

export async function execParallelly(commands: Record<string, string>) {
  const concurrentCommands: ConcurrentlyCommandInput[] = Object.entries(
    commands
  ).map(([name, command]) => ({
    name,
    command,
    env: process.env
  }));

  await concurrently(concurrentCommands, {
    handleInput: true,
    prefixColors: 'auto',
    killOthers: 'failure'
  })
    .result.then(() => {})
    .catch(() => {});
}
