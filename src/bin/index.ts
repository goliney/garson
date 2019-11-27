#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { runner } from './runner';

const cwd = process.cwd();
const CONFIG_FILEPATH = path.join(cwd, 'garson.config.js');

if (fs.existsSync(CONFIG_FILEPATH)) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require,import/no-dynamic-require
  const garsonConfig = require(CONFIG_FILEPATH);
  runner(garsonConfig);
} else {
  throw new Error(`Config file was not found: ${CONFIG_FILEPATH}`);
}
