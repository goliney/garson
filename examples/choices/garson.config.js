const { garson, prompts, actions } = require('../../dist');

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
      isNumericInputEnabled: true,
    })
  )
  .action(results => {
    const { command } = results;
    actions.spawn(command, { showCommand: true });
  });
