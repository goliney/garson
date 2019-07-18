"use strict";

const cwd = process.cwd();
let config;

try {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  config = require(`${cwd}/garson.config.js`);
} catch (e) {
  console.error('Failed to load config', e);
} // if (config) {
//   runner(config);
// }
//# sourceMappingURL=index.js.map