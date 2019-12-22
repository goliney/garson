import React from 'react';
import { Box } from 'ink';
import { Indicator } from './indicator';
import { Item, ItemProps, MultiChoiceOption } from './item';

interface MultiChoicesListControlledProps {
  items: MultiChoiceOption[];
  highlightedItem: MultiChoiceOption;
  selectedItems: MultiChoiceOption[];
  itemComponent?: React.ComponentType<ItemProps>;
}

/*
Controlled list of choices. Indicates the highlighted and selected items
 */
export function MultiChoicesList({
  items,
  highlightedItem,
  selectedItems,
  itemComponent = Item,
}: MultiChoicesListControlledProps) {
  return (
    <Box flexDirection="column">
      {items.map(item => {
        const isActive = item === highlightedItem;
        const isSelected = selectedItems.includes(item);
        return (
          <Box key={item.key || item.value}>
            <Indicator isSelected={isSelected} isActive={isActive} />
            {React.createElement(itemComponent, { isActive, item })}
          </Box>
        );
      })}
    </Box>
  );
}
