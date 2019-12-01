"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spawn = garsonSpawn;

var _child_process = require("child_process");

var _printMessage = require("./print-message");

function garsonSpawn(command, options) {
  (0, _printMessage.printMessage)({
    boxTitle: 'Run command ',
    message: command
  });
  (0, _child_process.spawn)(command, Object.assign({}, options, {
    stdio: 'inherit',
    shell: true
  }));
}