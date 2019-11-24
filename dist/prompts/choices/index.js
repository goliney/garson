"use strict";

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChoicesComponent = ChoicesComponent;
exports.choices = choices;

var _react = _interopRequireWildcard(require("react"));

var _helpers = require("../_helpers");

var _choicesList = require("./components/choicesList");

var _useChoicesNavigation = require("./use-choices-navigation");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ChoicesComponent({
  message,
  items,
  onSubmit
}) {
  const activeItem = (0, _useChoicesNavigation.useChoicesNavigation)(items);
  const submitResult = (0, _react.useCallback)(() => {
    onSubmit(activeItem.value);
  }, [activeItem, onSubmit]);
  (0, _helpers.useEnterKeyHandler)(submitResult);
  return _react.default.createElement(_react.default.Fragment, null, message && _react.default.createElement(_helpers.Question, {
    message: message
  }), _react.default.createElement(_choicesList.ChoicesList, {
    items: items,
    activeItem: activeItem
  }));
}

function choices({
  message,
  items
}) {
  return onSubmit => _react.default.createElement(ChoicesComponent, {
    message: message,
    items: items,
    onSubmit: onSubmit
  });
}