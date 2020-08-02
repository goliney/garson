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
  isSelected
}) {
  return _react.default.createElement(_ink.Box, {
    marginRight: 1,
    flexShrink: 0
  }, isSelected ? _react.default.createElement(_ink.Text, {
    color: "#0057ff"
  }, _figures.default.square) : _react.default.createElement(_ink.Text, null, " "));
}