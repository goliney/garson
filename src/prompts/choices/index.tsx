import React, { useCallback } from 'react';
import { OnSubmitCallback } from '../../types';
import { useEnterKeyHandler, Question } from '../../_helpers';
import { ChoicesList } from './components/choices-list';
import { ChoiceOption } from './components/item';
import { useChoicesNavigation } from './use-choices-navigation';
import { useNumericInputHandler } from './use-numeric-input-handler';

interface Choices {
  message?: string;
  isNumericInputEnabled: boolean;
  items: ChoiceOption[];
}

interface ChoicesProps extends Choices {
  onSubmit: OnSubmitCallback;
}

export function ChoicesComponent({
  message,
  isNumericInputEnabled,
  items,
  onSubmit,
}: ChoicesProps) {
  const highlightedItem = useChoicesNavigation(items);

  const submitResult = useCallback(() => {
    onSubmit(highlightedItem.value);
  }, [highlightedItem, onSubmit]);

  const handleNumericInput = useCallback(
    item => {
      if (!isNumericInputEnabled) {
        return;
      }
      onSubmit(item.value);
    },
    [isNumericInputEnabled, onSubmit]
  );

  useEnterKeyHandler(submitResult);

  useNumericInputHandler({
    items,
    onNumericInput: handleNumericInput,
  });

  return (
    <React.Fragment>
      {message && <Question message={message} />}
      <ChoicesList
        items={items}
        highlightedItem={highlightedItem}
        isNumericInputEnabled={isNumericInputEnabled}
      />
    </React.Fragment>
  );
}

export function choices({ message, isNumericInputEnabled = false, items }: Choices) {
  if (isNumericInputEnabled && items.length > 9) {
    throw new Error('If isNumericInputEnabled is true, the length of choices must be less than 10');
  }
  return (onSubmit: OnSubmitCallback) => (
    <ChoicesComponent
      message={message}
      isNumericInputEnabled={isNumericInputEnabled}
      items={items}
      onSubmit={onSubmit}
    />
  );
}
