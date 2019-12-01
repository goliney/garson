import React, { useCallback } from 'react';
import { OnSubmitCallback } from '../../types';
import { useEnterKeyHandler, Question } from '../../_helpers';
import { ChoicesList } from './components/choicesList';
import { ChoiceOption } from './components/item';
import { useChoicesNavigation } from './use-choices-navigation';

interface Choices {
  message?: string;
  items: ChoiceOption[];
}

interface ChoicesProps extends Choices {
  onSubmit: OnSubmitCallback;
}

export function ChoicesComponent({ message, items, onSubmit }: ChoicesProps) {
  const activeItem = useChoicesNavigation(items);

  const submitResult = useCallback(() => {
    onSubmit(activeItem.value);
  }, [activeItem, onSubmit]);

  useEnterKeyHandler(submitResult);

  return (
    <React.Fragment>
      {message && <Question message={message} />}
      <ChoicesList items={items} activeItem={activeItem} />
    </React.Fragment>
  );
}

export function choices({ message, items }: Choices) {
  return (onSubmit: OnSubmitCallback) => (
    <ChoicesComponent message={message} items={items} onSubmit={onSubmit} />
  );
}
