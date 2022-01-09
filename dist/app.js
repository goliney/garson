"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _ink.render)( /*#__PURE__*/_react.default.createElement(_ink.Text, null, "Initializing..."), {
  debug: false
});
exports.app = app;