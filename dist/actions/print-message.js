"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printMessage = printMessage;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _runner = require("../bin/runner");

var _helpers = require("../_helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function printMessage({
  boxTitle,
  message
}) {
  _runner.app.rerender(_react.default.createElement(_ink.Box, {
    flexDirection: "column",
    paddingBottom: 1
  }, _react.default.createElement(_helpers.Line, {
    message: boxTitle
  }), _react.default.createElement(_ink.Text, {
    italic: true
  }, _react.default.createElement(_ink.Box, {
    paddingY: 1
  }, message)), _react.default.createElement(_helpers.Line, null)));
}