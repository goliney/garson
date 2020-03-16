import childProcess from 'child_process';
import { actions } from '../../src';
import { app } from '../../src/app';

jest.mock('../../src/app');
jest.mock('child_process');

describe('Spawn', () => {
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
    expect(app.lastFrame()).not.toContain('pwd');
  });

  test('Show command', async () => {
    actions.spawn('ls -al', { showCommand: true });
    expect(childProcess.spawn).toHaveBeenCalledWith('ls -al', { shell: true, stdio: 'inherit' });
    expect(app.lastFrame()).toContain('ls -al');
    expect(app.lastFrame()).toMatchSnapshot();
  });
});
