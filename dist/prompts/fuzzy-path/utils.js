"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listNodes = listNodes;
exports.fuzzySearchNodes = fuzzySearchNodes;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _util = _interopRequireDefault(require("util"));

var _fuzzy = _interopRequireDefault(require("fuzzy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const readdir = _util.default.promisify(_fs.default.readdir);

function listNodes(_x) {
  return _listNodes.apply(this, arguments);
}

function _listNodes() {
  _listNodes = _asyncToGenerator(function* (nodePath) {
    try {
      const nodes = yield readdir(nodePath);
      const currentNode = [nodePath];

      if (nodes.length === 0) {
        return currentNode;
      }

      const nodesWithPath = nodes.map(nodeName => listNodes(_path.default.join(nodePath, nodeName)));
      const subNodes = yield Promise.all(nodesWithPath);
      return subNodes.reduce((acc, val) => acc.concat(val), currentNode);
    } catch (err) {
      if (err.code === 'ENOTDIR') {
        return [nodePath];
      }

      return [];
    }
  });
  return _listNodes.apply(this, arguments);
}

function fuzzySearchNodes(nodes, pattern) {
  return _fuzzy.default.filter(pattern, nodes, {
    pre: '<Color green>',
    post: '</Color>'
  }).map(match => match.string);
}
//# sourceMappingURL=utils.js.map