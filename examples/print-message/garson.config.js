const { garson, prompts, actions } = require('../../dist');

module.exports = garson()
  .prompt('name', prompts.input({ message: 'Name:' }))
  .action(results => {
    actions.printMessage({
      boxTitle: 'Greetings',
      message: `Hello, ${results.name}`,
    });
  });
