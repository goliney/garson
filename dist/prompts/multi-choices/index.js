"use strict";

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.weak-map.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiChoicesComponent = MultiChoicesComponent;
exports.multiChoices = multiChoices;

require("core-js/modules/es.array.map.js");

var _react = _interopRequireWildcard(require("react"));

var _helpers = require("../../_helpers");

var _multiChoicesList = require("./components/multi-choices-list");

var _useMultiChoicesNavigation = require("./use-multi-choices-navigation");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function MultiChoicesComponent({
  message,
  items,
  onChangeMiddleware,
  onSubmit
}) {
  const _useMultiChoicesNavig = (0, _useMultiChoicesNavigation.useMultiChoicesNavigation)(items, onChangeMiddleware),
        highlightedItem = _useMultiChoicesNavig.highlightedItem,
        selectedItems = _useMultiChoicesNavig.selectedItems;

  const submitResult = (0, _react.useCallback)(() => {
    onSubmit(selectedItems.map(item => item.value));
  }, [selectedItems, onSubmit]);
  (0, _helpers.useEnterKeyHandler)(submitResult);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, message && /*#__PURE__*/_react.default.createElement(_helpers.Question, {
    message: message
  }), /*#__PURE__*/_react.default.createElement(_multiChoicesList.MultiChoicesList, {
    items: items,
    highlightedItem: highlightedItem,
    selectedItems: selectedItems
  }));
}

function multiChoices({
  message,
  items,
  onChangeMiddleware
}) {
  return onSubmit => /*#__PURE__*/_react.default.createElement(MultiChoicesComponent, {
    message: message,
    items: items,
    onChangeMiddleware: onChangeMiddleware,
    onSubmit: onSubmit
  });
}