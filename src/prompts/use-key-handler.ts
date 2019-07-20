import { useContext, useEffect } from 'react';
import { StdinContext } from 'ink';

type keyHandlerType = (data: string) => void;

export function useKeyHandler(keyHandler: keyHandlerType) {
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
