import { useCallback } from 'react';
import { useKeyHandler } from './use-key-handler';
import { ENTER } from './keys';

export function useEnterKeyHandler(onEnter: () => void) {
  const handleKey = useCallback(
    key => {
      if (key === ENTER) {
        onEnter();
      }
    },
    [onEnter]
  );

  useKeyHandler(handleKey);
}
