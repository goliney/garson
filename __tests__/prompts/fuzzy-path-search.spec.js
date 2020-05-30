import fs from 'fs';
import { garson, prompts } from '../../src';
import { runner } from '../../src/bin/runner';
import { app } from '../../src/app';
import { ARROW_DOWN, ARROW_UP, BACKSPACE, ENTER } from '../../src/_helpers/keys';
import { stripColorsFromLastFrame, write } from '../helpers';

jest.mock('../../src/app');

jest.mock('fs');
jest.mock('util');

const actionSpy = jest.fn();

const MOCK_FILE_INFO = {
  path: {
    'foo-bar.js': '',
    'bar-lorem.js': '',
    bar: {},
    lorem: {
      'elit-bar.txt': '',
    },
    urna: {
      'ipsum-lorem.js': '',
      'amet-bar.js': '',
    },
  },
};

const config = garson()
  .prompt(
    'file',
    prompts.fuzzyPath({
      message: 'Enter file:',
      root: 'path',
      filter: node => !node.isDir,
    })
  )
  .action(actionSpy);

describe('Fuzzy Path Search', () => {
  beforeEach(async () => {
    // Set up some mocked out file info before each test
    // eslint-disable-next-line no-underscore-dangle
    fs.__setMockFiles(MOCK_FILE_INFO);

    actionSpy.mockClear();
    runner(config);
    await new Promise(resolve => setTimeout(resolve));
    await new Promise(resolve => setTimeout(resolve));
  });

  afterEach(() => {
    app.unmount();
  });

  test('Initial render', async () => {
    expect(app.lastFrame()).toMatchSnapshot();
  });

  test('Arrow controls', async () => {
    await write(ARROW_DOWN);
    expect(stripColorsFromLastFrame()).toContain('▇ bar-lorem.js  .');
    expect(app.lastFrame()).toMatchSnapshot();

    await write(ARROW_DOWN);
    expect(stripColorsFromLastFrame()).toContain('▇ elit-bar.txt  lorem');
    expect(app.lastFrame()).toMatchSnapshot();

    await write(ARROW_DOWN);
    expect(stripColorsFromLastFrame()).toContain('▇ ipsum-lorem.js  urna');
    expect(app.lastFrame()).toMatchSnapshot();

    await write(ARROW_DOWN);
    expect(stripColorsFromLastFrame()).toContain('▇ amet-bar.js  urna');
    expect(app.lastFrame()).toMatchSnapshot();
    await write(ARROW_DOWN);
    expect(stripColorsFromLastFrame()).toContain('▇ amet-bar.js  urna');
    expect(app.lastFrame()).toMatchSnapshot();

    await write(ARROW_UP);
    expect(stripColorsFromLastFrame()).toContain('▇ ipsum-lorem.js  urna');
    expect(app.lastFrame()).toMatchSnapshot();

    await write(ARROW_UP);
    expect(stripColorsFromLastFrame()).toContain('▇ elit-bar.txt  lorem');
    expect(app.lastFrame()).toMatchSnapshot();

    await write(ARROW_UP);
    expect(stripColorsFromLastFrame()).toContain('▇ bar-lorem.js  .');
    expect(app.lastFrame()).toMatchSnapshot();

    await write(ARROW_UP);
    expect(stripColorsFromLastFrame()).toContain('▇ foo-bar.js  .');
    expect(app.lastFrame()).toMatchSnapshot();

    await write(ARROW_UP);
    expect(stripColorsFromLastFrame()).toContain('▇ foo-bar.js  .');
    expect(app.lastFrame()).toMatchSnapshot();
  });

  test('Select', async () => {
    await write(ARROW_DOWN);
    await write(ARROW_DOWN);
    await write(ENTER); // select third option
    expect(actionSpy).toHaveBeenCalledWith({
      file: {
        isDir: false,
        path: 'path/lorem/elit-bar.txt',
        relativePath: 'lorem/elit-bar.txt',
        score: null,
      },
    });
  });

  test('Search', async () => {
    await write('bar');
    expect(stripColorsFromLastFrame()).toContain('▇ bar-lorem.js  .');
    expect(app.lastFrame()).toMatchSnapshot();

    // Test how highlighting changes
    await write(BACKSPACE);
    expect(app.lastFrame()).toMatchSnapshot();

    await write(BACKSPACE);
    expect(app.lastFrame()).toMatchSnapshot();

    await write(BACKSPACE);
    expect(app.lastFrame()).toMatchSnapshot();

    await write('foo');
    expect(stripColorsFromLastFrame()).toContain('▇ foo-bar.js  .');
    expect(app.lastFrame()).toMatchSnapshot();

    // Test how highlighting changes
    await write(BACKSPACE);
    expect(app.lastFrame()).toMatchSnapshot();

    await write(BACKSPACE);
    expect(app.lastFrame()).toMatchSnapshot();

    await write(BACKSPACE);
    expect(app.lastFrame()).toMatchSnapshot();

    await write('lorem');
    expect(stripColorsFromLastFrame()).toContain('▇ bar-lorem.js  .');
    expect(app.lastFrame()).toMatchSnapshot();

    await write(ARROW_DOWN);
    expect(stripColorsFromLastFrame()).toContain('▇ ipsum-lorem.js  urna');
    expect(app.lastFrame()).toMatchSnapshot();

    await write(ENTER);
    expect(actionSpy).toHaveBeenCalledWith({
      file: {
        isDir: false,
        path: 'path/urna/ipsum-lorem.js',
        relativePath: 'urna/ipsum-lorem.js',
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
