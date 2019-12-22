"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Item = Item;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Item({
  isHighlighted,
  item
}) {
  return _react.default.createElement(_ink.Color, {
    blue: isHighlighted
  }, item.label);
}