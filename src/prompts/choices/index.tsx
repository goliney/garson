import React from 'react';
import SelectInput from 'ink-select-input';
import { Indicator } from './indicator';
import { OnSubmitCallback } from '../../types';
import { Question } from '../_helpers';

type ChoiceValue = any;

interface ChoiceOption {
  key?: string;
  label: string;
  value: ChoiceValue;
}

interface Choices {
  message?: string;
  items: ChoiceOption[];
}

interface ChoicesProps extends Choices {
  onSubmit: OnSubmitCallback;
}

export function ChoicesComponent({ message, items, onSubmit }: ChoicesProps) {
  return (
    <React.Fragment>
      {message && <Question message={message} />}
      <SelectInput
        items={items}
        onSelect={item => onSubmit(item.value)}
        indicatorComponent={Indicator}
      />
    </React.Fragment>
  );
}

export function choices({ message, items }: Choices) {
  return (onSubmit: OnSubmitCallback) => (
    <ChoicesComponent message={message} items={items} onSubmit={onSubmit} />
  );
}
