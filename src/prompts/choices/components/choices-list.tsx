import React from 'react';
import { Box, Color } from 'ink';
import { Indicator } from './indicator';
import { Item, ItemProps, ChoiceOption } from './item';

interface ChoicesListControlledProps {
  items: ChoiceOption[];
  highlightedItem: ChoiceOption;
  isNumericInputEnabled?: boolean;
  itemComponent?: React.ComponentType<ItemProps>;
}

/*
Controlled list of choices. Indicates the highlighted item
 */
export function ChoicesList({
  items,
  highlightedItem,
  isNumericInputEnabled,
  itemComponent = Item,
}: ChoicesListControlledProps) {
  return (
    <Box flexDirection="column">
      {items.map((item, index) => {
        const isSelected = item === highlightedItem;
        return (
          <Box key={item.key || item.value}>
            <Indicator isSelected={isSelected} />
            {isNumericInputEnabled && (
              <Color hex={isSelected ? '#0057ff' : ''}>{index + 1}. </Color>
            )}
            {React.createElement(itemComponent, { isSelected, item })}
          </Box>
        );
      })}
    </Box>
  );
}
