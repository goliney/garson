"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printMessage = printMessage;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _app = require("../app");

var _helpers = require("../_helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function printMessage({
  boxTitle,
  message
}) {
  _app.app.rerender( /*#__PURE__*/_react.default.createElement(_ink.Box, {
    flexDirection: "column",
    paddingBottom: 1
  }, /*#__PURE__*/_react.default.createElement(_helpers.Line, {
    message: boxTitle,
    charFiller: "\u2500"
  }), /*#__PURE__*/_react.default.createElement(_ink.Box, {
    paddingY: 1
  }, /*#__PURE__*/_react.default.createElement(_ink.Text, {
    italic: true
  }, message)), /*#__PURE__*/_react.default.createElement(_helpers.Line, {
    charFiller: "\u2500"
  })));
}