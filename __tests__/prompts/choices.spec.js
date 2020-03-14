import { garson, prompts } from '../../src';
import { runner } from '../../src/bin/runner';
import { app } from '../../src/app';
import { ARROW_DOWN, ARROW_UP, ENTER } from '../../src/_helpers/keys';
import { stripColorsFromLastFrame, write } from '../helpers';

jest.mock('../../src/app');

const actionSpy = jest.fn();

const config = garson()
  .prompt(
    'command',
    prompts.choices({
      message: 'What git command you want to run?',
      items: [
        { label: 'See current branch', value: 'git branch' },
        { label: 'Checkout to master', value: 'git checkout master' },
        { label: 'See status', value: 'git status' },
      ],
    })
  )
  .action(actionSpy);

describe('Choices', () => {
  beforeEach(async () => {
    runner(config);
    await new Promise(resolve => setTimeout(resolve));
  });

  afterEach(() => {
    app.unmount();
  });

  test('Initial render', () => {
    expect(app.lastFrame()).toMatchSnapshot();
  });

  test('Arrow controls', async () => {
    await write(ARROW_DOWN);
    expect(stripColorsFromLastFrame()).toContain('▇ Checkout to master');
    expect(app.lastFrame()).toMatchSnapshot();

    await write(ARROW_DOWN);
    expect(stripColorsFromLastFrame()).toContain('▇ See status');
    expect(app.lastFrame()).toMatchSnapshot();

    await write(ARROW_DOWN);
    expect(stripColorsFromLastFrame()).toContain('▇ See status');
    expect(app.lastFrame()).toMatchSnapshot();

    await write(ARROW_UP);
    expect(stripColorsFromLastFrame()).toContain('▇ Checkout to master');
    expect(app.lastFrame()).toMatchSnapshot();

    await write(ARROW_UP);
    expect(stripColorsFromLastFrame()).toContain('▇ See current branch');
    expect(app.lastFrame()).toMatchSnapshot();

    await write(ARROW_UP);
    expect(stripColorsFromLastFrame()).toContain('▇ See current branch');
    expect(app.lastFrame()).toMatchSnapshot();
  });

  test('Select', async () => {
    await write(ARROW_DOWN);
    await write(ARROW_DOWN);
    await write(ENTER); // select third option
    expect(actionSpy).toHaveBeenCalledWith({ command: 'git status' });
  });
});
