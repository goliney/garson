import { useCallback, useState, useEffect } from 'react';
import { useKeyHandler } from '../../_helpers';
import { ARROW_DOWN, ARROW_UP, SPACE } from '../../_helpers/keys';
import { MultiChoiceOption } from './components/item';

export function useMultiChoicesNavigation(items: MultiChoiceOption[]) {
  const [highlightedItem, setActiveItem] = useState(items[0]);
  const [selectedItems, setSelectedItems] = useState<MultiChoiceOption[]>([]);

  // pre-select default items
  useEffect(() => {
    setSelectedItems(items.filter(item => item.isSelected));
  }, [items]);

  const highlightPrevItem = useCallback(() => {
    if (items.length === 0 || !highlightedItem) {
      return;
    }
    const indexOfActive = items.indexOf(highlightedItem);
    const prevItemIndex = Math.max(indexOfActive - 1, 0);
    setActiveItem(items[prevItemIndex]);
  }, [highlightedItem, items]);

  const highlightNextItem = useCallback(() => {
    if (items.length === 0 || !highlightedItem) {
      return;
    }
    const indexOfActive = items.indexOf(highlightedItem);
    const nextItemIndex = Math.min(indexOfActive + 1, items.length - 1);
    setActiveItem(items[nextItemIndex]);
  }, [highlightedItem, items]);

  const toggleSelection = useCallback(() => {
    const newSelectedItems = items.filter(item => {
      const isAlreadySelected = selectedItems.includes(item);
      const isActive = item === highlightedItem;
      return (isAlreadySelected && !isActive) || (!isAlreadySelected && isActive);
    });
    setSelectedItems(newSelectedItems);
  }, [highlightedItem, items]);

  const handleKey = useCallback(
    key => {
      switch (key) {
        case ARROW_UP:
          highlightPrevItem();
          break;
        case ARROW_DOWN:
          highlightNextItem();
          break;
        case SPACE:
          toggleSelection();
          break;
        default:
          break;
      }
    },
    [highlightPrevItem, highlightNextItem]
  );

  useKeyHandler(handleKey);

  return { highlightedItem, selectedItems };
}
