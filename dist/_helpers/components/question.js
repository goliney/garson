"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Question = Question;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Question({
  message
}) {
  return /*#__PURE__*/_react.default.createElement(_ink.Box, null, /*#__PURE__*/_react.default.createElement(_ink.Box, {
    marginRight: 1
  }, /*#__PURE__*/_react.default.createElement(_ink.Text, {
    color: "green"
  }, "?")), message && /*#__PURE__*/_react.default.createElement(_ink.Box, {
    marginRight: 1
  }, /*#__PURE__*/_react.default.createElement(_ink.Text, {
    color: "green"
  }, message)));
}