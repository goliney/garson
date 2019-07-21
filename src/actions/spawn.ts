import { spawn, SpawnOptionsWithoutStdio } from 'child_process';

function garsonSpawn(command: string, options?: SpawnOptionsWithoutStdio) {
  return spawn(
    command,
    Object.assign({}, options, {
      stdio: 'inherit',
      shell: true,
    }),
  );
}

export { garsonSpawn as spawn };
