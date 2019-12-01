"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChoicesComponent = ChoicesComponent;
exports.choices = choices;

var _react = _interopRequireWildcard(require("react"));

var _helpers = require("../../_helpers");

var _choicesList = require("./components/choicesList");

var _useChoicesNavigation = require("./use-choices-navigation");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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