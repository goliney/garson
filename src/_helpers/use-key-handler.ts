import { useEffect } from 'react';
import { useStdin } from 'ink';

type KeyHandlerType = (data: string) => void;

export function useKeyHandler(keyHandler: KeyHandlerType) {
  const { stdin, setRawMode } = useStdin();

  useEffect(() => {
    if (!stdin) {
      return;
    }
    if (setRawMode) {
      setRawMode(true);
    }
    stdin.on('data', keyHandler);
    return () => {
      stdin.removeListener('data', keyHandler);
      if (setRawMode) {
        setRawMode(false);
      }
    };
  }, [stdin, setRawMode, keyHandler]);
}
