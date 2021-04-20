import { garson, prompts } from '../../src';
import { runner } from '../../src/bin/runner';
import { app } from '../../src/app';
import { ARROW_DOWN, ARROW_UP, BACKSPACE, ENTER } from '../../src/_helpers/keys';
import { stripColorsFromLastFrame, write, waitFor } from '../helpers';

jest.mock('../../src/app');

const actionSpy = jest.fn();

const config = garson()
  .prompt(
    'file',
    prompts.fuzzyPath({
      message: 'Enter file:',
      pattern: '**',
      options: { nodir: true, cwd: '__tests__/_fixture-path/' },
    })
  )
  .action(actionSpy);

describe('Fuzzy Path Search', () => {
  beforeEach(async () => {
    actionSpy.mockClear();
    runner(config);
    await waitFor(() => {
      expect(stripColorsFromLastFrame().length).toBeGreaterThan(1);
    });
  });

  afterEach(() => {
    app.unmount();
  });

  test('Initial render', async () => {
    expect(stripColorsFromLastFrame()).toMatchSnapshot();
  });

  test('Arrow controls', async () => {
    await write(ARROW_DOWN);
    expect(stripColorsFromLastFrame()).toContain('▇ foo-bar.js  .');
    expect(stripColorsFromLastFrame()).toMatchSnapshot();

    await write(ARROW_DOWN);
    expect(stripColorsFromLastFrame()).toContain('▇ elit-bar.txt  lorem');
    expect(stripColorsFromLastFrame()).toMatchSnapshot();

    await write(ARROW_DOWN);
    expect(stripColorsFromLastFrame()).toContain('▇ amet-bar.js  urna');
    expect(stripColorsFromLastFrame()).toMatchSnapshot();

    await write(ARROW_DOWN);
    expect(stripColorsFromLastFrame()).toContain('▇ ipsum-lorem.js  urna');
    expect(stripColorsFromLastFrame()).toMatchSnapshot();
    await write(ARROW_DOWN);
    expect(stripColorsFromLastFrame()).toContain('▇ ipsum-lorem.js  urna');
    expect(stripColorsFromLastFrame()).toMatchSnapshot();

    await write(ARROW_UP);
    expect(stripColorsFromLastFrame()).toContain('▇ amet-bar.js  urna');
    expect(stripColorsFromLastFrame()).toMatchSnapshot();

    await write(ARROW_UP);
    expect(stripColorsFromLastFrame()).toContain('▇ elit-bar.txt  lorem');
    expect(stripColorsFromLastFrame()).toMatchSnapshot();

    await write(ARROW_UP);
    expect(stripColorsFromLastFrame()).toContain('▇ foo-bar.js  .');
    expect(stripColorsFromLastFrame()).toMatchSnapshot();

    await write(ARROW_UP);
    expect(stripColorsFromLastFrame()).toContain('▇ bar-lorem.js  .');
    expect(stripColorsFromLastFrame()).toMatchSnapshot();

    await write(ARROW_UP);
    expect(stripColorsFromLastFrame()).toContain('▇ bar-lorem.js  .');
    expect(stripColorsFromLastFrame()).toMatchSnapshot();
  });

  test('Select', async () => {
    await write(ARROW_DOWN);
    await write(ARROW_DOWN);
    await write(ENTER); // select third option
    expect(actionSpy).toHaveBeenCalledWith({
      file: {
        path: 'lorem/elit-bar.txt',
        score: null,
      },
    });
  });

  test('Search', async () => {
    await write('bar');
    expect(stripColorsFromLastFrame()).toContain('▇ bar-lorem.js  .');
    expect(stripColorsFromLastFrame()).toMatchSnapshot();

    // Test how highlighting changes
    await write(BACKSPACE);
    expect(stripColorsFromLastFrame()).toMatchSnapshot();

    await write(BACKSPACE);
    expect(stripColorsFromLastFrame()).toMatchSnapshot();

    await write(BACKSPACE);
    expect(stripColorsFromLastFrame()).toMatchSnapshot();

    await write('foo');
    expect(stripColorsFromLastFrame()).toContain('▇ foo-bar.js  .');
    expect(stripColorsFromLastFrame()).toMatchSnapshot();

    // Test how highlighting changes
    await write(BACKSPACE);
    expect(stripColorsFromLastFrame()).toMatchSnapshot();

    await write(BACKSPACE);
    expect(stripColorsFromLastFrame()).toMatchSnapshot();

    await write(BACKSPACE);
    expect(stripColorsFromLastFrame()).toMatchSnapshot();

    await write('lorem');
    expect(stripColorsFromLastFrame()).toContain('▇ bar-lorem.js  .');
    expect(stripColorsFromLastFrame()).toMatchSnapshot();

    await write(ARROW_DOWN);
    expect(stripColorsFromLastFrame()).toContain('▇ ipsum-lorem.js  urna');
    expect(stripColorsFromLastFrame()).toMatchSnapshot();

    await write(ENTER);
    expect(actionSpy).toHaveBeenCalledWith({
      file: {
        path: 'urna/ipsum-lorem.js',
        score: {
          labelMatch: [
            {
              end: 11,
              start: 6,
            },
          ],
          score: 32768,
        },
      },
    });
  });
});
