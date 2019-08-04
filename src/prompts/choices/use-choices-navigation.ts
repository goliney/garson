import { useCallback, useEffect, useState } from 'react';
import { useKeyHandler } from '../_helpers';
import { ARROW_DOWN, ARROW_UP } from '../_helpers/keys';
import { ChoiceOption } from './components/item';

export function useChoicesNavigation(items: ChoiceOption[]) {
  const [activeItem, setActiveItem] = useState(items[0]);

  useEffect(() => {
    setActiveItem(items[0]);
  }, [items]);

  const selectPrevItem = useCallback(() => {
    if (items.length === 0 || !activeItem) {
      return;
    }
    const indexOfActive = items.indexOf(activeItem);
    const prevItemIndex = Math.max(indexOfActive - 1, 0);
    setActiveItem(items[prevItemIndex]);
  }, [activeItem, items]);

  const selectNextItem = useCallback(() => {
    if (items.length === 0 || !activeItem) {
      return;
    }
    const indexOfActive = items.indexOf(activeItem);
    const nextItemIndex = Math.min(indexOfActive + 1, items.length - 1);
    setActiveItem(items[nextItemIndex]);
  }, [activeItem, items]);

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
    [selectPrevItem, selectNextItem],
  );

  useKeyHandler(handleKey);

  return activeItem;
}
