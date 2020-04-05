import { useCallback } from 'react';
import { ChoiceOption } from './components/item';
import { useKeyHandler } from '../../_helpers';

interface NumericInputHandlerParameters {
  items: ChoiceOption[];
  onNumericInput: (item: ChoiceOption) => void;
}

export function useNumericInputHandler({ items, onNumericInput }: NumericInputHandlerParameters) {
  const handleKey = useCallback(
    key => {
      if (!/^[1|2|3|4|5|6|7|8|9]$/.test(key)) {
        return;
      }

      const index = parseInt(key, 10);
      const item = items[index - 1];
      if (!item) {
        return;
      }

      onNumericInput(item);
    },
    [items, onNumericInput]
  );

  useKeyHandler(handleKey);
}
