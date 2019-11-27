#!/usr/bin/env node
"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _runner = require("./runner");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cwd = process.cwd();

const CONFIG_FILEPATH = _path.default.join(cwd, 'garson.config.js');

if (_fs.default.existsSync(CONFIG_FILEPATH)) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require,import/no-dynamic-require
  const garsonConfig = require(CONFIG_FILEPATH);

  (0, _runner.runner)(garsonConfig);
} else {
  throw new Error(`Config file was not found: ${CONFIG_FILEPATH}`);
}