#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import commander from 'commander';

const program = new commander.Command();

program
  .name('garson')
  .option('-c, --config <path>', 'set config path', 'garson.config.js')
  .version(
    process.env.npm_package_version || 'no version specified',
    '-v, --version',
    'output the current version'
  )
  .parse(process.argv);

if (program.config) {
  const cwd = process.cwd();
  const CONFIG_FILEPATH = path.join(cwd, program.config);

  if (fs.existsSync(CONFIG_FILEPATH)) {
    /* eslint-disable @typescript-eslint/no-var-requires,global-require,import/no-dynamic-require */
    const { runner } = require('./runner');
    const garsonConfig = require(CONFIG_FILEPATH);
    /* eslint-enable @typescript-eslint/no-var-requires,global-require,import/no-dynamic-require */
    runner(garsonConfig);
  } else {
    throw new Error(`Config file was not found: ${CONFIG_FILEPATH}`);
  }
}
