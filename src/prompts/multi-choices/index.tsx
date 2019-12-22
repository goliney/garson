import React, { useCallback } from 'react';
import { OnSubmitCallback } from '../../types';
import { useEnterKeyHandler, Question } from '../../_helpers';
import { MultiChoicesList } from './components/multi-choices-list';
import { MultiChoiceOption } from './components/item';
import { useMultiChoicesNavigation } from './use-multi-choices-navigation';

interface MultiChoices {
  message?: string;
  items: MultiChoiceOption[];
}

interface MultiChoicesProps extends MultiChoices {
  onSubmit: OnSubmitCallback;
}

export function MultiChoicesComponent({ message, items, onSubmit }: MultiChoicesProps) {
  const { highlightedItem, selectedItems } = useMultiChoicesNavigation(items);

  const submitResult = useCallback(() => {
    onSubmit(selectedItems.map(item => item.value));
  }, [selectedItems, onSubmit]);

  useEnterKeyHandler(submitResult);

  return (
    <React.Fragment>
      {message && <Question message={message} />}
      <MultiChoicesList
        items={items}
        highlightedItem={highlightedItem}
        selectedItems={selectedItems}
      />
    </React.Fragment>
  );
}

export function multiChoices({ message, items }: MultiChoices) {
  return (onSubmit: OnSubmitCallback) => (
    <MultiChoicesComponent message={message} items={items} onSubmit={onSubmit} />
  );
}
