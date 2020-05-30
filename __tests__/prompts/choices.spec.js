import { garson, prompts } from '../../src';
import { runner } from '../../src/bin/runner';
import { app } from '../../src/app';
import { ARROW_DOWN, ARROW_UP, ENTER } from '../../src/_helpers/keys';
import { stripColorsFromLastFrame, write } from '../helpers';

jest.mock('../../src/app');

const actionSpy = jest.fn();

const choicesOptions = {
  message: 'What git command you want to run?',
  items: [
    { label: 'See current branch', value: 'git branch' },
    { label: 'Checkout to master', value: 'git checkout master' },
    { label: 'See status', value: 'git status' },
  ],
};

const config = garson()
  .prompt('command', prompts.choices(choicesOptions))
  .action(actionSpy);

const configWithNumericInput = garson()
  .prompt('command', prompts.choices({ ...choicesOptions, isNumericInputEnabled: true }))
  .action(actionSpy);

describe('Choices', () => {
  beforeEach(async () => {
    actionSpy.mockClear();
    runner(config);
    await new Promise(resolve => setTimeout(resolve));
  });

  afterEach(() => {
    app.unmount();
  });

  test('Initial render', () => {
    expect(stripColorsFromLastFrame()).toMatchSnapshot();
  });

  test('Arrow controls', async () => {
    await write(ARROW_DOWN);
    expect(stripColorsFromLastFrame()).toContain('▇ Checkout to master');
    expect(stripColorsFromLastFrame()).toMatchSnapshot();

    await write(ARROW_DOWN);
    expect(stripColorsFromLastFrame()).toContain('▇ See status');
    expect(stripColorsFromLastFrame()).toMatchSnapshot();

    await write(ARROW_DOWN);
    expect(stripColorsFromLastFrame()).toContain('▇ See status');
    expect(stripColorsFromLastFrame()).toMatchSnapshot();

    await write(ARROW_UP);
    expect(stripColorsFromLastFrame()).toContain('▇ Checkout to master');
    expect(stripColorsFromLastFrame()).toMatchSnapshot();

    await write(ARROW_UP);
    expect(stripColorsFromLastFrame()).toContain('▇ See current branch');
    expect(stripColorsFromLastFrame()).toMatchSnapshot();

    await write(ARROW_UP);
    expect(stripColorsFromLastFrame()).toContain('▇ See current branch');
    expect(stripColorsFromLastFrame()).toMatchSnapshot();
  });

  test('Select', async () => {
    await write('3'); // since isNumericInputEnabled is false, nothing should happen
    expect(actionSpy).not.toHaveBeenCalled();

    await write(ARROW_DOWN);
    await write(ARROW_DOWN);
    await write(ENTER); // select third option
    expect(actionSpy).toHaveBeenCalledWith({ command: 'git status' });
  });

  describe('With numeric input enabled', () => {
    test('Selects correct item', async () => {
      app.unmount();
      runner(configWithNumericInput);
      await new Promise(resolve => setTimeout(resolve));
      expect(stripColorsFromLastFrame()).toContain('▇ 1. See current branch');
      expect(stripColorsFromLastFrame()).toMatchSnapshot();
      await write('4');
      expect(actionSpy).not.toHaveBeenCalled();
      await write('3');
      expect(actionSpy).toHaveBeenCalledWith({ command: 'git status' });
    });

    test('Checks the number of items', async () => {
      app.unmount();
      expect(() => {
        garson()
          .prompt(
            'command',
            prompts.choices({
              ...choicesOptions,
              items: new Array(10),
              isNumericInputEnabled: true,
            })
          )
          .action(actionSpy);
      }).toThrow('If isNumericInputEnabled is true, the length of choices must be less than 10');
    });
  });
});
