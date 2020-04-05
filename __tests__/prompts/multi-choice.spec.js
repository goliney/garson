import { garson, prompts } from '../../src';
import { runner } from '../../src/bin/runner';
import { app } from '../../src/app';
import { ENTER, SPACE, ARROW_DOWN, ARROW_UP } from '../../src/_helpers/keys';
import { write, stripColorsFromLastFrame } from '../helpers';

jest.mock('../../src/app');

const actionSpy = jest.fn();

const config = garson()
  .prompt(
    'wcOptions',
    prompts.multiChoices({
      message: 'What do you want to count in garson.config.js file?',
      items: [
        { label: 'Lines', value: 'l', isSelected: true },
        { label: 'Words', value: 'w', isSelected: true },
        { label: 'Characters', value: 'm' },
        { label: 'Everything', value: 'lwm', isSelected: false },
      ],
      // optional handler
      onChangeMiddleware(newItems, oldItems, allItems) {
        const isEverything = item => item.value === 'lwm';
        const newItemsHaveEverythingSelected = newItems.some(isEverything);
        const oldItemsHaveEverythingSelected = oldItems.some(isEverything);

        if (newItemsHaveEverythingSelected && !oldItemsHaveEverythingSelected) {
          // if "Everything" just got selected, deselect everything else
          return allItems.filter(isEverything);
        }

        if (oldItemsHaveEverythingSelected) {
          // if "Everything" was selected, deselect it
          return newItems.filter(item => !isEverything(item));
        }

        return newItems;
      },
    })
  )
  .action(actionSpy);

describe('Multi Choice', () => {
  beforeEach(async () => {
    actionSpy.mockClear();
    runner(config);
    await new Promise(resolve => setTimeout(resolve));
  });

  afterEach(() => {
    app.unmount();
  });

  test('Initial render', () => {
    expect(stripColorsFromLastFrame()).toContain('▇ ◉ Lines');
    expect(app.lastFrame()).toMatchSnapshot();
  });

  test('Arrow controls', async () => {
    await write(ARROW_DOWN);
    expect(stripColorsFromLastFrame()).toContain('▇ ◉ Words');
    expect(app.lastFrame()).toMatchSnapshot();

    await write(ARROW_DOWN);
    expect(stripColorsFromLastFrame()).toContain('▇ ◯ Characters');
    expect(app.lastFrame()).toMatchSnapshot();

    await write(ARROW_DOWN);
    expect(stripColorsFromLastFrame()).toContain('▇ ◯ Everything');
    expect(app.lastFrame()).toMatchSnapshot();

    await write(ARROW_DOWN);
    expect(stripColorsFromLastFrame()).toContain('▇ ◯ Everything');
    expect(app.lastFrame()).toMatchSnapshot();

    await write(ARROW_UP);
    expect(stripColorsFromLastFrame()).toContain('▇ ◯ Characters');
    expect(app.lastFrame()).toMatchSnapshot();

    await write(ARROW_UP);
    expect(stripColorsFromLastFrame()).toContain('▇ ◉ Words');
    expect(app.lastFrame()).toMatchSnapshot();

    await write(ARROW_UP);
    expect(stripColorsFromLastFrame()).toContain('▇ ◉ Lines');
    expect(app.lastFrame()).toMatchSnapshot();

    await write(ARROW_UP);
    expect(stripColorsFromLastFrame()).toContain('▇ ◉ Lines');
    expect(app.lastFrame()).toMatchSnapshot();
  });

  test('Toggle selection', async () => {
    await write(SPACE);
    expect(app.lastFrame()).toMatchSnapshot();

    await write(ARROW_DOWN);
    await write(ARROW_DOWN);
    await write(SPACE);

    expect(app.lastFrame()).toMatchSnapshot();

    await write(ENTER);
    expect(actionSpy).toHaveBeenCalledWith({ wcOptions: ['w', 'm'] });
  });

  test('onChangeMiddleware', async () => {
    await write(ARROW_DOWN);
    await write(ARROW_DOWN);
    await write(ARROW_DOWN);

    await write(SPACE); // toggle 'Everything'
    expect(stripColorsFromLastFrame()).toContain('◯ Lines');
    expect(stripColorsFromLastFrame()).toContain('◯ Words');
    expect(stripColorsFromLastFrame()).toContain('◯ Characters');
    expect(stripColorsFromLastFrame()).toContain('◉ Everything');
    expect(app.lastFrame()).toMatchSnapshot();

    await write(ARROW_UP);
    await write(SPACE); // toggle something besides of 'Everything'
    expect(stripColorsFromLastFrame()).toContain('◯ Lines');
    expect(stripColorsFromLastFrame()).toContain('◯ Words');
    expect(stripColorsFromLastFrame()).toContain('◉ Characters');
    expect(stripColorsFromLastFrame()).toContain('◯ Everything');
    expect(app.lastFrame()).toMatchSnapshot();
  });
});
