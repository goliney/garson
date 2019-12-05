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




