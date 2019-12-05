# garson

[![Build Status](https://travis-ci.org/goliney/garson.svg?branch=master)](https://travis-ci.org/goliney/garson)
[![npm version](https://badge.fury.io/js/garson.svg)](https://badge.fury.io/js/garson)

Interactive config-based command line tool

# TODO: COOL EXAMPLE GIF :sunglasses:

## Install

```shell script
npm install -g garson # needed for binary
npm install garson # needed for config file
```
Alternatively, if you don't want to install the package locally, you can add global modules path to
NODE_PATH ([link](https://stackoverflow.com/a/43504699/1065780)):
```shell script
export NODE_PATH=$(npm root --quiet -g)
```

## Usage
Run:
```shell script
garson
```
This command will look for `garson.config.js` file in the current directory.

## Examples

#### Basic
```js
// garson.config.js
const { garson, prompts, actions } = require('garson');

module.exports = garson()
  // first prompt
  .prompt(
    'name',
    prompts.input({
      message: "What's your name?",
      placeholder: 'E.g. Barney',
    }),
  )
  // second prompt
  .prompt(
    'isAwesome',
    prompts.choices({
      message: 'Are you awesome?',
      items: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    }),
  )
  // final action
  .action(results => {
    const { name, isAwesome } = results;
    const message = isAwesome
      ? `Keep it up, ${name}!`
      : `${name}, be awesome instead.`;
    actions.printMessage({ message });
  });
```

#### Fuzzy path search

```js
// garson.config.js
const path = require('path');
const { garson, prompts, actions } = require('./dist');

module.exports = garson()
  .prompt(
    'file',
    prompts.fuzzyPath({
      message: "Enter file:",
      root: path.join(__dirname, 'src'),
      filter: node => !node.isDir,
    }),
  )
  .action(results => {
    const { file } = results;
    actions.spawn(`wc ${file.path}`);
  });
```
