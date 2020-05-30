import { garson, prompts } from '../../src';
import { runner } from '../../src/bin/runner';
import { app } from '../../src/app';
import { ENTER } from '../../src/_helpers/keys';
import { stripColorsFromLastFrame } from '../helpers';

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

  test('Normal flow', () => {
    runner(config);
    expect(stripColorsFromLastFrame()).toMatchSnapshot();

    app.stdin.write('Chandler');
    expect(stripColorsFromLastFrame()).toMatchSnapshot();

    app.stdin.write(ENTER);
    expect(stripColorsFromLastFrame()).toMatchSnapshot();

    app.stdin.write('Bing');
    expect(stripColorsFromLastFrame()).toMatchSnapshot();

    app.stdin.write(ENTER);
    expect(actionSpy).toHaveBeenCalledWith({ firstName: 'Chandler', lastName: 'Bing' });
  });

  test('No labels', () => {
    runner(configNoLabels);
    expect(stripColorsFromLastFrame()).toMatchSnapshot();

    app.stdin.write('Something');
    expect(stripColorsFromLastFrame()).toMatchSnapshot();

    app.stdin.write(ENTER);
    expect(actionSpy).toHaveBeenCalledWith({ noLabels: 'Something' });
  });
});
