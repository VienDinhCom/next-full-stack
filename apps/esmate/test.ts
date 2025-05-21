import { trim } from 'es-toolkit';
import shell from 'shell-quote';

console.log(
  shell.parse(
    '    dsfdsf    dsfdsfds "helloj" $HOME --hello 1   --hello 2 ',
    process.env
  )
);

function stringArgv(command: string) {
  return shell.parse(command, process.env);
}

const hello = 1;
