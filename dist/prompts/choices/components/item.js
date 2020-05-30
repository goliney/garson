"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Item = Item;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Item({
  isSelected,
  item
}) {
  return _react.default.createElement(_ink.Color, {
    hex: isSelected ? '#0057ff' : ''
  }, item.label);
}