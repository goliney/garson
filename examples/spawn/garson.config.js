const { garson, prompts, actions } = require('../../dist');

module.exports = garson()
  .prompt(
    'command',
    prompts.choices({
      items: [
        { label: 'See current path', value: 'pwd' },
        { label: 'See current folder content', value: 'ls -al' },
      ],
    })
  )
  .action(results => {
    actions.spawn(results.command, { showCommand: true });
  });
