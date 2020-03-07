"use strict";

require("core-js/modules/es.array.map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiChoicesComponent = MultiChoicesComponent;
exports.multiChoices = multiChoices;

var _react = _interopRequireWildcard(require("react"));

var _helpers = require("../../_helpers");

var _multiChoicesList = require("./components/multi-choices-list");

var _useMultiChoicesNavigation = require("./use-multi-choices-navigation");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
  return _react.default.createElement(_react.default.Fragment, null, message && _react.default.createElement(_helpers.Question, {
    message: message
  }), _react.default.createElement(_multiChoicesList.MultiChoicesList, {
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
  return onSubmit => _react.default.createElement(MultiChoicesComponent, {
    message: message,
    items: items,
    onChangeMiddleware: onChangeMiddleware,
    onSubmit: onSubmit
  });
}