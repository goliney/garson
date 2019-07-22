const path = require('path');
const garson = require('./dist').garson;
const { input, choices, fuzzyPath } = require('./dist/prompts');
const spawn = require('./dist/actions').spawn;

const init = results =>
  garson(results)
    .prompt('input', input({ placeholder: '(Type something)' }))
    .prompt('filePath', fuzzyPath({ message: 'Select a file:', root: path.join(__dirname, 'src') }))
    .prompt(
      'init',
      choices({
        message: "What'd you like today?",
        items: [{ label: 'Work', value: 'work' }, { label: 'Rest', value: 'rest' }],
      }),
    )
    .action(results => {
      switch (results.init) {
        case 'work':
          return gitChoices(results);
        case 'rest':
          return restChoices(results);
      }
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
