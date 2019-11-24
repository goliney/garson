const path = require('path');
const { garson, prompts, actions } = require('./dist');

const init = results =>
  garson(results)
    .prompt(
      'init',
      prompts.choices({
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
      prompts.fuzzyPath({
        message: 'See content of a file:',
        root: path.join(__dirname, 'src'),
        filter: node => !node.isDir,
      }),
    )
    .prompt('grep', prompts.input({ placeholder: '(Type something you want to grep)' }))
    .prompt(
      'showLineNumber',
      prompts.choices({
        message: 'Show line number?',
        items: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
      }),
    )
    .action(results => {
      const { filePath, grep, showLineNumber } = results;
      return actions.spawn(`cat ${filePath.path} | grep ${showLineNumber ? '-n' : ''} "${grep}"`);
    });

const restChoices = results =>
  garson(results)
    .prompt(
      'restChoices',
      prompts.choices({
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
           actions.spawn('google-chrome twitter.com');
          break;
        case 'watch':
           actions.spawn('google-chrome youtube.com');
          break;
        case 'back':
          return init(results);
      }
    });

const gitChoices = results =>
  garson(results)
    .prompt(
      'git',
      prompts.choices({
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
           actions.spawn('git status');
          break;
        case 'branch':
           actions.spawn('git branch');
          break;
        case 'back':
          return init(results);
      }
    });

module.exports = init();
