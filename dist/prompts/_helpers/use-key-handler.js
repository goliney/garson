"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useKeyHandler = useKeyHandler;

var _react = require("react");

var _ink = require("ink");

function useKeyHandler(keyHandler) {
  const _useContext = (0, _react.useContext)(_ink.StdinContext),
        stdin = _useContext.stdin,
        setRawMode = _useContext.setRawMode;

  (0, _react.useEffect)(() => {
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