"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = void 0;

var _spawn = require("./spawn");

var _printMessage = require("./print-message");

const actions = {
  spawn: _spawn.spawn,
  printMessage: _printMessage.printMessage
};
exports.actions = actions;