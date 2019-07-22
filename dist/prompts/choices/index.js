"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChoicesComponent = ChoicesComponent;
exports.choices = choices;

var _react = _interopRequireDefault(require("react"));

var _inkSelectInput = _interopRequireDefault(require("ink-select-input"));

var _indicator = require("./indicator");

var _helpers = require("../_helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ChoicesComponent({
  message,
  items,
  onSubmit
}) {
  return _react.default.createElement(_react.default.Fragment, null, message && _react.default.createElement(_helpers.Question, {
    message: message
  }), _react.default.createElement(_inkSelectInput.default, {
    items: items,
    onSelect: item => onSubmit(item.value),
    indicatorComponent: _indicator.Indicator
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