import { garson, prompts } from '../../src';
import { runner } from '../../src/bin/runner';
import { app } from '../../src/app';
import { ENTER } from '../../src/_helpers/keys';
import { write, trimFrame, stripColorsFromLastFrame } from '../helpers';

jest.mock('../../src/app');

const actionSpy = jest.fn();

const config = garson()
  // first prompt
  .prompt(
    'firstName',
    prompts.input({
      message: "What's your first name?",
      placeholder: 'E.g. John',
    })
  )
  // second prompt
  .prompt(
    'lastName',
    prompts.input({
      message: "What's your last name?",
      placeholder: 'E.g. Smith',
      defaultValue: 'Bing',
    })
  )
  // final action
  .action(actionSpy);

const configNoLabels = garson()
  .prompt('noLabels', prompts.input())
  .action(actionSpy);

describe('Input', () => {
  beforeEach(() => {
    actionSpy.mockClear();
  });

  afterEach(() => {
    app.unmount();
  });

  test('Normal flow', async () => {
    runner(config);
    await new Promise(resolve => setTimeout(resolve));
    expect(stripColorsFromLastFrame()).toMatchSnapshot();

    await write('Chandler');
    expect(trimFrame(stripColorsFromLastFrame())).toMatchSnapshot();

    await write(ENTER);
    expect(trimFrame(stripColorsFromLastFrame())).toMatchSnapshot();

    await write(ENTER);
    expect(actionSpy).toHaveBeenCalledWith({ firstName: 'Chandler', lastName: 'Bing' });
  });

  test('No labels', async () => {
    runner(configNoLabels);
    await new Promise(resolve => setTimeout(resolve));
    expect(trimFrame(stripColorsFromLastFrame())).toMatchSnapshot();

    await write('Something');
    expect(trimFrame(stripColorsFromLastFrame())).toMatchSnapshot();

    await write(ENTER);
    expect(actionSpy).toHaveBeenCalledWith({ noLabels: 'Something' });
  });
});
