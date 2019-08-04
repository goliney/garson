"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PatternHighlightItem = PatternHighlightItem;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PatternHighlightItem({
  isSelected,
  item
}) {
  return _react.default.createElement(_ink.Color, {
    blue: isSelected
  }, item.label);
}