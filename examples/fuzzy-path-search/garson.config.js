const { garson, prompts, actions } = require('../../dist');

module.exports = garson()
  .prompt(
    'file',
    prompts.fuzzyPath({
      message: 'Enter file:',
      pattern: '**',
      options: {
        nodir: true,
        cwd: '/Users/goliney/Workspace/garson/src',
      },
    })
  )
  .action(results => {
    const { file } = results;
    actions.spawn(`nano ${file.path}`);
  });
