import childProcess from 'child_process';
import { actions } from '../../src';
import { app } from '../../src/app';
import { stripColorsFromLastFrame } from '../helpers';

jest.mock('../../src/app');
jest.mock('child_process');

describe('Spawn', () => {
  beforeEach(async () => {
    process.stdout.columns = 80; // needed for line output to be consistent
  });

  afterEach(() => {
    childProcess.spawn.mockReset();
    app.unmount();
  });

  test('Common usage', () => {
    actions.spawn('git pull');
    expect(childProcess.spawn).toHaveBeenCalledWith('git pull', { shell: true, stdio: 'inherit' });
  });

  test('Options', () => {
    actions.spawn('pwd', { options: { shell: false } });
    expect(childProcess.spawn).toHaveBeenCalledWith('pwd', { shell: false, stdio: 'inherit' });
    expect(stripColorsFromLastFrame()).not.toContain('pwd');
  });

  test('Show command', () => {
    actions.spawn('ls -al', { showCommand: true });
    expect(childProcess.spawn).toHaveBeenCalledWith('ls -al', { shell: true, stdio: 'inherit' });
    expect(stripColorsFromLastFrame()).toContain('ls -al');
    expect(stripColorsFromLastFrame()).toMatchSnapshot();
  });
});
