"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Indicator = Indicator;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _figures = _interopRequireDefault(require("figures"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Indicator({
  isHighlighted,
  isSelected
}) {
  return _react.default.createElement(_ink.Box, {
    marginRight: 1,
    flexShrink: 0
  }, isHighlighted ? _react.default.createElement(_ink.Color, {
    blue: true
  }, _figures.default.square, " ") : '  ', _react.default.createElement(_ink.Color, {
    blue: isHighlighted
  }, isSelected ? _figures.default.circleFilled : _figures.default.circle));
}