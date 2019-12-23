const { garson, prompts, actions } = require('garson');

module.exports = garson()
  // first prompt
  .prompt(
    'name',
    prompts.input({
      message: "What's your name?",
      placeholder: 'E.g. Barney',
    })
  )
  // second prompt
  .prompt(
    'isAwesome',
    prompts.choices({
      message: 'Are you wearing a suit?',
      items: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
    })
  )
  // final action
  .action(results => {
    const { name, isAwesome } = results;
    const message = isAwesome ? `High five, ${name}!` : `${name}, suit up!`;
    actions.printMessage({ message });
  });
