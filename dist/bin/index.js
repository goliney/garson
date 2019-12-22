#!/usr/bin/env node
"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _commander = _interopRequireDefault(require("commander"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const program = new _commander.default.Command();
program.name('garson').option('-c, --config <path>', 'set config path', 'garson.config.js').version(process.env.npm_package_version || 'no version specified', '-v, --version', 'output the current version').parse(process.argv);

if (program.config) {
  const cwd = process.cwd();

  const CONFIG_FILEPATH = _path.default.join(cwd, program.config);

  if (_fs.default.existsSync(CONFIG_FILEPATH)) {
    /* eslint-disable @typescript-eslint/no-var-requires,global-require,import/no-dynamic-require */
    const _require = require('./runner'),
          runner = _require.runner;

    const garsonConfig = require(CONFIG_FILEPATH);
    /* eslint-enable @typescript-eslint/no-var-requires,global-require,import/no-dynamic-require */


    runner(garsonConfig);
  } else {
    throw new Error(`Config file was not found: ${CONFIG_FILEPATH}`);
  }
}