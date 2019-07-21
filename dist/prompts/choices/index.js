"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChoicesComponent = ChoicesComponent;
exports.choices = choices;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _inkSelectInput = _interopRequireDefault(require("ink-select-input"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ChoicesComponent({
  message,
  items,
  onSubmit
}) {
  return _react.default.createElement(_react.default.Fragment, null, message && _react.default.createElement(_ink.Box, null, _react.default.createElement(_ink.Color, {
    green: true
  }, message)), _react.default.createElement(_inkSelectInput.default, {
    items: items,
    onSelect: item => onSubmit(item.value)
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
//# sourceMappingURL=index.js.map