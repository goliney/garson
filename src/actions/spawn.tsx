import { spawn, SpawnOptionsWithoutStdio } from 'child_process';
import { printMessage } from './print-message';

interface SpawnParameters {
  options?: SpawnOptionsWithoutStdio;
  showCommand?: boolean;
}

function garsonSpawn(command: string, { options, showCommand }: SpawnParameters = {}) {
  if (showCommand) {
    printMessage({ boxTitle: 'Run command ', message: command });
  }
  spawn(
    command,
    Object.assign(
      {
        stdio: 'inherit',
        shell: true,
      },
      options
    )
  );
}

export { garsonSpawn as spawn };
