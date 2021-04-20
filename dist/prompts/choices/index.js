"use strict";

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.weak-map.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChoicesComponent = ChoicesComponent;
exports.choices = choices;

var _react = _interopRequireWildcard(require("react"));

var _helpers = require("../../_helpers");

var _choicesList = require("./components/choices-list");

var _useChoicesNavigation = require("./use-choices-navigation");

var _useNumericInputHandler = require("./use-numeric-input-handler");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ChoicesComponent({
  message,
  isNumericInputEnabled,
  items,
  onSubmit
}) {
  const highlightedItem = (0, _useChoicesNavigation.useChoicesNavigation)(items);
  const submitResult = (0, _react.useCallback)(() => {
    onSubmit(highlightedItem.value);
  }, [highlightedItem, onSubmit]);
  const handleNumericInput = (0, _react.useCallback)(item => {
    if (!isNumericInputEnabled) {
      return;
    }

    onSubmit(item.value);
  }, [isNumericInputEnabled, onSubmit]);
  (0, _helpers.useEnterKeyHandler)(submitResult);
  (0, _useNumericInputHandler.useNumericInputHandler)({
    items,
    onNumericInput: handleNumericInput
  });
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, message && /*#__PURE__*/_react.default.createElement(_helpers.Question, {
    message: message
  }), /*#__PURE__*/_react.default.createElement(_choicesList.ChoicesList, {
    items: items,
    highlightedItem: highlightedItem,
    isNumericInputEnabled: isNumericInputEnabled
  }));
}

function choices({
  message,
  isNumericInputEnabled = false,
  items
}) {
  if (isNumericInputEnabled && items.length > 9) {
    throw new Error('If isNumericInputEnabled is true, the length of choices must be less than 10');
  }

  return onSubmit => /*#__PURE__*/_react.default.createElement(ChoicesComponent, {
    message: message,
    isNumericInputEnabled: isNumericInputEnabled,
    items: items,
    onSubmit: onSubmit
  });
}