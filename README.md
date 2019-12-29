# garson

[![Build Status](https://travis-ci.org/goliney/garson.svg?branch=master)](https://travis-ci.org/goliney/garson)
[![npm version](https://badge.fury.io/js/garson.svg)](https://www.npmjs.com/package/garson)

Interactive config-based command line tool

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
You can change the default path with `--config` option.

See `garson --help` for a full list of options.

## Configuration

A `garson.conf.js` file should export a garson object, which is represented by
a chain of prompts that ends with an action:
```js
const { garson, prompts, actions } = require('garson');

module.exports = garson()
  .prompt(/* some prompt */)
  .action(/* some action  */);
```

There could be many prompts, but they must end with a single action:
```js
const { garson, prompts, actions } = require('garson');

module.exports = garson()
  .prompt(/* some prompt */)
  .prompt(/* another prompt */)
  .prompt(/* one more prompt */)
  .action(/* the only action  */); // you can't chain anything to .action()
```

It's possible to return another garson object from the action callback:
```js
const { garson, prompts, actions } = require('garson');

const branchA = garson()
  .prompt(/* branch A prompt */)
  .action(/* branch A action */);

const branchB = garson()
  .prompt(/* branch B prompt */)
  .action(/* branch B action */);

module.exports = garson()
  .prompt(/* prompt */)
  .action(results => {
    if (results.someKey) {
      return branchA; // will show branch A prompt and then branch A action
    } else {
      return branchB; // will show branch B prompt and then branch B action
    }
  });
```

## Prompts

Each `.prompt()` takes two arguments:
 1. prompt key
 2. prompt object

Prompt key is needed to define a property in the result object which is passed
into an action callback. Prompt objects defines a type of a prompt.

### Input `prompts.input()`

Provides a text input.

<table>
  <thead>
   <tr>
     <th>Property name</th>
     <th>Type</th>
     <th>Required</th>
     <th>Description</th>
   </tr>
 </thead>
 <tbody>
   <tr>
     <td>message</td>
     <td>String</td>
     <td>No</td>
     <td>Text to display next to the input</td>
   </tr>
   <tr>
     <td>placeholder</td>
     <td>String</td>
     <td>No</td>
     <td>Text to display when the value is empty</td>
   </tr>
 </tbody>
</table>

Example:
```js
// garson.config.js
const { garson, prompts, actions } = require('garson');

module.exports = garson()
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
  .action(results => {
    // note the keys of the result object
    const { firstName, lastName } = results;
    actions.printMessage({ message: `Hello, ${firstName} ${lastName}` });
  });
```
![input prompt example](examples/input/example.gif)


### Fuzzy path search `prompts.fuzzyPath()`

Provides a fuzzy search for a file or a folder in a specified directory.

<table>
  <thead>
   <tr>
     <th>Property name</th>
     <th>Type</th>
     <th>Required</th>
     <th>Description</th>
   </tr>
 </thead>
 <tbody>
   <tr>
     <td>message</td>
     <td>String</td>
     <td>No</td>
     <td>Text to display next to the input</td>
   </tr>
   <tr>
     <td>placeholder</td>
     <td>String</td>
     <td>No</td>
     <td>Text to display when the input value is empty</td>
   </tr>
   <tr>
     <td>root</td>
     <td>String</td>
     <td>Yes</td>
     <td>Path to a root directory where we are searching</td>
   </tr>
   <tr>
     <td>filter</td>
     <td>Function</td>
     <td>No</td>
     <td>
       A filter function that is applied to the found path nodes.
       It is useful for allowing the selection of files or directories only.
       Path node object contains <code>isDir</code>, <code>path</code>, <code>relativePath</code> and
       <code>highlightedRelativePath</code> properties.
     </td>
   </tr>
 </tbody>
</table>

Example:
```js
// garson.config.js
const { garson, prompts, actions } = require('garson');

module.exports = garson()
  .prompt(
    'file',
    prompts.fuzzyPath({
      message: 'Enter file:',
      root: '/Users/goliney/Workspace/garson/src',
      filter: node => !node.isDir, // filter out directories
    })
  )
  .action(results => {
    const { file } = results;
    actions.spawn(`wc ${file.path}`);
  });
```
![fuzzy path search prompt example](examples/fuzzy-path-search/example.gif)


### Choices `prompts.choices()`

Allows to select a value from the list.

<table>
  <thead>
   <tr>
     <th>Property name</th>
     <th>Type</th>
     <th>Required</th>
     <th>Description</th>
   </tr>
 </thead>
 <tbody>
   <tr>
     <td>message</td>
     <td>String</td>
     <td>No</td>
     <td>Text to display next to the options</td>
   </tr>
   <tr>
     <td>items</td>
     <td>Array</td>
     <td>Yes</td>
     <td>
       List of options. Each option should be an objects with <code>label</code> and <code>value</code> properties.
       Label is a string to display. Value could have any type, it gets passed into the action callback.
     </td>
   </tr>
 </tbody>
</table>

Example:
```js
// garson.config.js
const { garson, prompts, actions } = require('garson');

module.exports = garson()
  .prompt(
    'command',
    prompts.choices({
      message: 'What git command you want to run?',
      items: [
        { label: 'See current branch', value: 'git branch' },
        { label: 'Checkout to master', value: 'git checkout master' },
        { label: 'See status', value: 'git status' },
      ],
    })
  )
  .action(results => {
    const { command } = results;
    actions.spawn(command, { showCommand: true });
  });
```
![choices prompt example](examples/choices/example.gif)


### Multi choices `prompts.multiChoices()`

Allows to select multiple values from the list.

<table>
  <thead>
   <tr>
     <th>Property name</th>
     <th>Type</th>
     <th>Required</th>
     <th>Description</th>
   </tr>
 </thead>
 <tbody>
   <tr>
     <td>message</td>
     <td>String</td>
     <td>No</td>
     <td>Text to display next to the options</td>
   </tr>
   <tr>
     <td>items</td>
     <td>Array</td>
     <td>Yes</td>
     <td>
       List of options. Each option should be an objects with <code>label</code> and <code>value</code> properties.
       Label is a string to display. Value could have any type, it gets passed into the action callback.
       Same as for the <code>choices</code> prompt.
     </td>
   </tr>
 </tbody>
</table>

Example:

```js
// garson.config.js
const { garson, prompts, actions } = require('garson');

module.exports = garson()
  .prompt(
    'wcOptions',
    prompts.multiChoices({
      message: 'What do you want to count in garson.config.js file?',
      items: [
        { label: 'Lines', value: 'l', isSelected: true },
        { label: 'Words', value: 'w', isSelected: true },
        { label: 'Characters', value: 'm' },
      ],
    })
  )
  .action(results => {
    const { wcOptions } = results; // wcOptions is an array
    const options = wcOptions.length ? `-${wcOptions.join('')}` : '';
    actions.spawn(`wc ${options} garson.config.js`);
  });
```
![multi choices prompt example](examples/multi-choices/example.gif)


## Actions

The `action` takes a single argument - a callback which is invoked with the results of
all the prompts that were already shown.

It's up to you to decide what to do next with the result data. Since it's JavaScript environment,
your further actions are limited only by Node.

For your convenience `garson` is shipped with a couple of actions that might get handy.

### Print message `actions.printMessage()`

Shows a text message on the screen.

<table>
  <thead>
   <tr>
     <th>Property name</th>
     <th>Type</th>
     <th>Required</th>
     <th>Description</th>
   </tr>
 </thead>
 <tbody>
   <tr>
     <td>boxTitle</td>
     <td>String</td>
     <td>No</td>
     <td>Text to display above the message</td>
   </tr>
   <tr>
     <td>message</td>
     <td>String</td>
     <td>Yes</td>
     <td>Message to show</td>
   </tr>
 </tbody>
</table>

Example:
```js
const { garson, prompts, actions } = require('garson');

module.exports = garson()
  .prompt('name', prompts.input({ message: 'Name:' }))
  .action(results => {
    actions.printMessage({
      boxTitle: 'Greetings',
      message: `Hello, ${results.name}`
    });
  });
```
![print message action example](examples/print-message/example.gif)


### Spawn `actions.spawn()`

A wrapper over Node's [`spawn`](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options).
It can get handy when you want to run a command in the terminal.

`actions.spawn` accepts two arguments:
1. A mandatory command string
2. An optional spawn options objects. See [`spawn docs`](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options)
for a full list of parameters. Optionally, you can set `{ showCommand: true }` to see the
command before executing it.

Example:
```js
const { garson, prompts, actions } = require('garson');

module.exports = garson()
  .prompt(
    'command',
    prompts.choices({
      items: [
        { label: 'See current path', value: 'pwd' },
        { label: 'See current folder content', value: 'ls -al' }
      ]
    })
  )
  .action(results => {
    actions.spawn(results.command, { showCommand: true });
  });
```
![spawn action example](examples/spawn/example.gif)
