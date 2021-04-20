const { garson, prompts, actions } = require('../../dist');

module.exports = garson()
  .prompt(
    'file',
    prompts.fuzzyPath({
      message: 'Enter file:',
      pattern: '/Users/goliney/Workspace/garson/**',
      options: {
        nodir: true,
        ignore: '**/node_modules/**',
      },
    })
  )
  .action(results => {
    const { file } = results;
    actions.spawn(`nano ${file.path}`);
  });
