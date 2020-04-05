"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useNumericInputHandler = useNumericInputHandler;

var _react = require("react");

var _helpers = require("../../_helpers");

function useNumericInputHandler({
  items,
  onNumericInput
}) {
  const handleKey = (0, _react.useCallback)(key => {
    if (!/^[1|2|3|4|5|6|7|8|9]$/.test(key)) {
      return;
    }

    const index = parseInt(key, 10);
    const item = items[index - 1];

    if (!item) {
      return;
    }

    onNumericInput(item);
  }, [items, onNumericInput]);
  (0, _helpers.useKeyHandler)(handleKey);
}