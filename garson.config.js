const path = require('path');
const { garson } = require('./dist');
const { input, choices, fuzzyPath } = require('./dist/prompts');
const { spawn } = require('./dist/actions');

const init = results =>
  garson(results)
    .prompt(
      'init',
      choices({
        message: "What'd you like today?",
        items: [
          { label: 'See file content', value: 'seeFileContent' },
          { label: 'Run git command', value: 'git' },
          { label: 'Rest', value: 'rest' },
        ],
      }),
    )
    .action(results => {
      switch (results.init) {
        case 'seeFileContent':
          return seeFileContent();
        case 'git':
          return gitChoices();
        case 'rest':
          return restChoices();
      }
    });

const seeFileContent = results =>
  garson(results)
    .prompt(
      'filePath',
      fuzzyPath({
        message: 'See content of a file:',
        root: path.join(__dirname, 'src'),
        filter: node => !node.isDir,
      }),
    )
    .prompt('grep', input({ placeholder: '(Type something you want to grep)' }))
    .prompt(
      'showLineNumber',
      choices({
        message: 'Show line number?',
        items: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
      }),
    )
    .action(results => {
      const { filePath, grep, showLineNumber } = results;
      return spawn(`cat ${filePath.path} | grep ${showLineNumber ? '-n' : ''} "${grep}"`);
    });

const restChoices = results =>
  garson(results)
    .prompt(
      'restChoices',
      choices({
        message: 'What type of rest?',
        items: [
          { label: 'Read', value: 'read' },
          { label: 'Watch', value: 'watch' },
          { label: 'Back', value: 'back' },
        ],
      }),
    )
    .action(results => {
      switch (results.restChoices) {
        case 'read':
          spawn('google-chrome twitter.com');
          break;
        case 'watch':
          spawn('google-chrome youtube.com');
          break;
        case 'back':
          return init(results);
      }
    });

const gitChoices = results =>
  garson(results)
    .prompt(
      'git',
      choices({
        message: 'What git command should I run?',
        items: [
          { label: 'Status', value: 'status' },
          { label: 'Branch', value: 'branch' },
          { label: 'Back', value: 'back' },
        ],
      }),
    )
    .action(results => {
      switch (results.git) {
        case 'status':
          spawn('git status');
          break;
        case 'branch':
          spawn('git branch');
          break;
        case 'back':
          return init(results);
      }
    });

module.exports = init();
