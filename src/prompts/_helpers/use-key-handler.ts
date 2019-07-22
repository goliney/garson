import { useContext, useEffect } from 'react';
import { StdinContext } from 'ink';

type KeyHandlerType = (data: string) => void;

export function useKeyHandler(keyHandler: KeyHandlerType) {
  const { stdin, setRawMode } = useContext(StdinContext);

  useEffect(() => {
    if (setRawMode) {
      setRawMode(true);
    }
    stdin.on('data', keyHandler);
    return () => {
      stdin.off('data', keyHandler);
      if (setRawMode) {
        setRawMode(false);
      }
    };
  }, [stdin, setRawMode, keyHandler]);
}
