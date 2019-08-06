"use strict";

require("core-js/modules/es.array.map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PatternHighlightItem = PatternHighlightItem;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PatternHighlightItem({
  isSelected,
  item
}) {
  const tokens = (0, _utils.parseHighlightedString)(item.value.highlightedRelativePath || item.label);
  return _react.default.createElement(_ink.Color, {
    blue: isSelected
  }, tokens.map(token => _react.default.createElement(_ink.Color, {
    key: token.key,
    inverse: token.highlighted
  }, token.value)));
}