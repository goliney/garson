import { runner } from './runner';

const cwd = process.cwd();
let garsonConfig;

try {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  garsonConfig = require(`${cwd}/garson.config.js`);
} catch (e) {
  console.error('Failed to load config', e);
}

if (garsonConfig) {
  runner(garsonConfig);
}
