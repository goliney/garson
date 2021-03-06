"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Line = Line;

require("core-js/modules/es.array.iterator.js");

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Line({
  message = '',
  charFiller = '=',
  color = 'green'
}) {
  const lineWidth = process.stdout.columns || 0;
  const fillerWidth = message ? lineWidth - message.length : lineWidth;
  return /*#__PURE__*/_react.default.createElement(_ink.Text, {
    color: color
  }, message, [...Array(fillerWidth)].join(charFiller));
}