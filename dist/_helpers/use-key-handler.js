"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useKeyHandler = useKeyHandler;

var _react = require("react");

var _ink = require("ink");

function useKeyHandler(keyHandler) {
  const _useStdin = (0, _ink.useStdin)(),
        stdin = _useStdin.stdin,
        setRawMode = _useStdin.setRawMode;

  (0, _react.useEffect)(() => {
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