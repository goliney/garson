import { spawn, SpawnOptionsWithoutStdio } from 'child_process';
import { printMessage } from './print-message';

function garsonSpawn(command: string, options?: SpawnOptionsWithoutStdio) {
  printMessage({ boxTitle: 'Run command ', message: command });
  spawn(
    command,
    Object.assign({}, options, {
      stdio: 'inherit',
      shell: true,
    }),
  );
}

export { garsonSpawn as spawn };
