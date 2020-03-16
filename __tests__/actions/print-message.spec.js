import { actions } from '../../src';
import { app } from '../../src/app';

jest.mock('../../src/app');

describe('Print Message', () => {
  beforeEach(() => {
    process.stdout.columns = 80; // needed for line output to be consistent
  });
  afterEach(() => {
    app.unmount();
  });

  test('With box title', async () => {
    actions.printMessage({ message: `Hello`, boxTitle: 'Simon says' });
    expect(app.lastFrame()).toMatchSnapshot();
  });

  test('Without box title', async () => {
    actions.printMessage({ message: `Simon says hi` });
    expect(app.lastFrame()).toMatchSnapshot();
  });
});
