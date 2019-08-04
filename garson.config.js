const path = require('path');
const { garson } = require('./dist');
const { input, choices, fuzzyPath } = require('./dist/prompts');
const { spawn } = require('./dist/actions');

const init = results =>
  garson(results)
    .prompt(
      'filePath',
      fuzzyPath({
        message: 'Select a file:',
        root: '/home/goliney/workspace/DataRobot/tests/js/unit',
        filter: node => !node.isDir,
      }),
    )
    .prompt('input', input({ placeholder: '(Type something)' }))
    .action(results => {
      console.log(JSON.stringify(results.filePath));
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
