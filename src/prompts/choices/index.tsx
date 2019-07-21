import React from 'react';
import { Box, Color } from 'ink';
import SelectInput from 'ink-select-input';
import { onSubmitCallback } from '../../types';

type choiceValue = any;

interface ChoiceOption {
  key?: string;
  label: string;
  value: choiceValue;
}

interface Choices {
  message?: string;
  items: ChoiceOption[];
}

interface ChoicesProps extends Choices {
  onSubmit: onSubmitCallback;
}

export function ChoicesComponent({ message, items, onSubmit }: ChoicesProps) {
  return (
    <React.Fragment>
      {message && (
        <Box>
          <Color green>{message}</Color>
        </Box>
      )}
      <SelectInput items={items} onSelect={item => onSubmit(item.value)} />
    </React.Fragment>
  );
}

export function choices({ message, items }: Choices) {
  return (onSubmit: onSubmitCallback) => (
    <ChoicesComponent message={message} items={items} onSubmit={onSubmit} />
  );
}
