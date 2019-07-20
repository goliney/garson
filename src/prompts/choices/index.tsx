import React, { useState, useEffect, useCallback } from 'react';
import { Box, Color } from 'ink';
import { ARROW_DOWN, ARROW_UP, ENTER } from '../keys';
import { useKeyHandler } from '../use-key-handler';
import { onSubmitCallback } from '../../types';

type choiceValue = any;

interface ChoiceOption {
  label: string;
  value: choiceValue;
}

interface Choices {
  message: string;
  items: ChoiceOption[];
}

interface ChoicesProps extends Choices {
  onSubmit: onSubmitCallback;
}

export function ChoicesComponent({ message, items, onSubmit }: ChoicesProps) {
  const [activeItem, setActiveItem] = useState(items[0]);

  useEffect(() => {
    setActiveItem(items[0]);
  }, [items]);

  const selectNextItem = useCallback(() => {
    const indexOfActive = items.indexOf(activeItem);
    const nextItemIndex = Math.min(indexOfActive + 1, items.length - 1);
    setActiveItem(items[nextItemIndex]);
  }, [activeItem, items]);

  const selectPrevItem = useCallback(() => {
    const indexOfActive = items.indexOf(activeItem);
    const prevItemIndex = Math.max(indexOfActive - 1, 0);
    setActiveItem(items[prevItemIndex]);
  }, [activeItem, items]);

  const submitResult = useCallback(() => {
    onSubmit(activeItem.value);
  }, [activeItem, onSubmit]);

  useKeyHandler(data => {
    const s = String(data);

    switch (s) {
      case ARROW_UP:
        selectPrevItem();
        break;
      case ARROW_DOWN:
        selectNextItem();
        break;
      case ENTER:
        submitResult();
        break;
      default:
        break;
    }
  });

  return (
    <React.Fragment>
      <Box>
        <Color green>{message}</Color>
      </Box>
      {items.map(item => (
        <Box key={item.value}>
          {item === activeItem && <Color blue>{item.label}</Color>}
          {item !== activeItem && <Color gray>{item.label}</Color>}
        </Box>
      ))}
    </React.Fragment>
  );
}

export function choices({ message, items }: Choices) {
  return (onSubmit: onSubmitCallback) => (
    <ChoicesComponent message={message} items={items} onSubmit={onSubmit} />
  );
}
