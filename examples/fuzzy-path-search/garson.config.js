const { garson, prompts, actions } = require('../../dist');

const cwd = '/Users/goliney/Workspace/garson/src';
module.exports = garson()
  .prompt(
    'file',
    prompts.fuzzyPath({
      message: 'Enter file:',
      pattern: '**',
      options: {
        nodir: true,
        cwd,
      },
    })
  )
  .action(results => {
    const { file } = results;
    actions.spawn(`nano ${cwd}/${file.path}`);
  });
