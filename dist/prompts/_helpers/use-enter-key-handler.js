"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useEnterKeyHandler = useEnterKeyHandler;

var _react = require("react");

var _useKeyHandler = require("./use-key-handler");

var _keys = require("./keys");

function useEnterKeyHandler(onEnter) {
  const handleKey = (0, _react.useCallback)(key => {
    if (key === _keys.ENTER) {
      onEnter();
    }
  }, [onEnter]);
  (0, _useKeyHandler.useKeyHandler)(handleKey);
}
//# sourceMappingURL=use-enter-key-handler.js.map