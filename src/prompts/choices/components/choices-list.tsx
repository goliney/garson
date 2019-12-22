import React from 'react';
import { Box } from 'ink';
import { Indicator } from './indicator';
import { Item, ItemProps, ChoiceOption } from './item';

interface ChoicesListControlledProps {
  items: ChoiceOption[];
  highlightedItem: ChoiceOption;
  itemComponent?: React.ComponentType<ItemProps>;
}

/*
Controlled list of choices. Indicates the highlighted item
 */
export function ChoicesList({
  items,
  highlightedItem,
  itemComponent = Item,
}: ChoicesListControlledProps) {
  return (
    <Box flexDirection="column">
      {items.map(item => {
        const isSelected = item === highlightedItem;
        return (
          <Box key={item.key || item.value}>
            <Indicator isSelected={isSelected} />
            {React.createElement(itemComponent, { isSelected, item })}
          </Box>
        );
      })}
    </Box>
  );
}
