"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spawn = garsonSpawn;

var _child_process = require("child_process");

function garsonSpawn(command, options) {
  return (0, _child_process.spawn)(command, Object.assign({}, options, {
    stdio: 'inherit',
    shell: true
  }));
}
//# sourceMappingURL=spawn.js.map