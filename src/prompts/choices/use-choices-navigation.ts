import { useCallback, useEffect, useState } from 'react';
import { useKeyHandler } from '../../_helpers';
import { ARROW_DOWN, ARROW_UP } from '../../_helpers/keys';
import { ChoiceOption } from './components/item';

export function useChoicesNavigation(items: ChoiceOption[]) {
  const [highlightedItem, setHighlightedItem] = useState(items[0]);

  useEffect(() => {
    setHighlightedItem(items[0]);
  }, [items]);

  const selectPrevItem = useCallback(() => {
    if (items.length === 0 || !highlightedItem) {
      return;
    }
    const indexOfHighlighted = items.indexOf(highlightedItem);
    const prevItemIndex = Math.max(indexOfHighlighted - 1, 0);
    setHighlightedItem(items[prevItemIndex]);
  }, [highlightedItem, items]);

  const selectNextItem = useCallback(() => {
    if (items.length === 0 || !highlightedItem) {
      return;
    }
    const indexOfHighlighted = items.indexOf(highlightedItem);
    const nextItemIndex = Math.min(indexOfHighlighted + 1, items.length - 1);
    setHighlightedItem(items[nextItemIndex]);
  }, [highlightedItem, items]);

  const handleKey = useCallback(
    key => {
      switch (key) {
        case ARROW_UP:
          selectPrevItem();
          break;
        case ARROW_DOWN:
          selectNextItem();
          break;
        default:
          break;
      }
    },
    [selectPrevItem, selectNextItem]
  );

  useKeyHandler(handleKey);

  return highlightedItem;
}
