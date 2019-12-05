const path = require('path');
const { garson, prompts, actions } = require('garson');

module.exports = garson()
  .prompt(
    'file',
    prompts.fuzzyPath({
      message: "Enter file:",
      root: path.join(__dirname, 'src'),
      filter: node => !node.isDir,
    }),
  )
  .action(results => {
    const { file } = results;
    actions.spawn(`wc ${file.path}`);
  });
