const { garson, prompts, actions } = require('garson');

module.exports = garson()
  .prompt(
    'file',
    prompts.fuzzyPath({
      message: 'Enter file:',
      root: '/Users/goliney/Workspace/garson/src',
      filter: node => !node.isDir,
    })
  )
  .action(results => {
    const { file } = results;
    actions.spawn(`nano ${file.path}`);
  });
