const { garson, prompts, actions } = require('../../dist');

module.exports = garson()
  .prompt(
    'wcOptions',
    prompts.multiChoices({
      message: 'What do you want to count in garson.config.js file?',
      items: [
        { label: 'Lines', value: 'l', isSelected: true },
        { label: 'Words', value: 'w', isSelected: true },
        { label: 'Characters', value: 'm' },
        { label: 'Everything', value: 'lwm', isSelected: false },
      ],
      // optional handler
      onChangeMiddleware(newItems, oldItems, allItems) {
        const isEverything = item => item.value === 'lwm';
        const newItemsHaveEverythingSelected = newItems.some(isEverything);
        const oldItemsHaveEverythingSelected = oldItems.some(isEverything);

        if (newItemsHaveEverythingSelected && !oldItemsHaveEverythingSelected) {
          // if "Everything" just got selected, deselect everything else
          return allItems.filter(isEverything);
        }

        if (oldItemsHaveEverythingSelected) {
          // if "Everything" was selected, deselect it
          return newItems.filter(item => !isEverything(item));
        }

        return newItems;
      },
    })
  )
  .action(results => {
    const { wcOptions } = results;
    const options = wcOptions.length ? `-${wcOptions.join('')}` : '';
    actions.spawn(`wc ${options} ./examples/multi-choices/garson.config.js`);
  });
