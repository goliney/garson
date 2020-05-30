"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.array.sort");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listNodes = listNodes;
exports.fuzzySearchNodes = fuzzySearchNodes;
exports.highlightStringByScore = highlightStringByScore;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _util = _interopRequireDefault(require("util"));

var _vscodeFuzzyScorer = require("vscode-fuzzy-scorer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const readdir = _util.default.promisify(_fs.default.readdir);

function listNodes(_x, _x2) {
  return _listNodes.apply(this, arguments);
}

function _listNodes() {
  _listNodes = _asyncToGenerator(function* (nodePath, root) {
    const relativeRoot = root || nodePath;

    try {
      const nodes = yield readdir(nodePath);
      const currentNode = [{
        isDir: true,
        path: nodePath,
        relativePath: _path.default.relative(relativeRoot, nodePath),
        score: null
      }];

      if (nodes.length === 0) {
        return currentNode;
      } // recursively get child nodes


      const nodesWithPath = nodes.map(nodeName => listNodes(_path.default.join(nodePath, nodeName), relativeRoot));
      const subNodes = yield Promise.all(nodesWithPath);
      return subNodes.reduce((acc, val) => acc.concat(val), currentNode);
    } catch (err) {
      if (err.code === 'ENOTDIR') {
        return [{
          isDir: false,
          path: nodePath,
          relativePath: _path.default.relative(relativeRoot, nodePath),
          score: null
        }];
      }

      return [];
    }
  });
  return _listNodes.apply(this, arguments);
}

function fuzzySearchNodes(nodes, pattern) {
  if (!nodes) {
    return [];
  }

  if (!pattern) {
    return nodes.map(node => _objectSpread({}, node));
  }

  const query = (0, _vscodeFuzzyScorer.prepareQuery)(pattern);
  const cache = {};
  const results = [...nodes].sort((r1, r2) => (0, _vscodeFuzzyScorer.compareFilePathsByFuzzyScore)({
    pathA: r1.relativePath,
    pathB: r2.relativePath,
    query,
    cache
  }));
  return results.map(item => _objectSpread({}, item, {
    score: (0, _vscodeFuzzyScorer.scoreFilePathFuzzy)({
      path: item.relativePath,
      query,
      cache
    })
  }));
}

function highlightStringByScore(source, matches) {
  const start = matches[0].start;
  const tokens = start === 0 ? [] : [{
    start: 0,
    end: start,
    highlighted: false
  }];
  matches.forEach((match, index) => {
    tokens.push({
      start: match.start,
      end: match.end,
      highlighted: true
    });

    if (match.end === source.length) {
      return;
    }

    const isLast = index === matches.length - 1;
    const nextStart = isLast ? source.length : matches[index + 1].start;
    tokens.push({
      start: match.end,
      end: nextStart,
      highlighted: false
    });
  });
  return tokens.map(token => {
    const substring = source.slice(token.start, token.end);
    return {
      key: `${substring} ${token.start}`,
      value: substring,
      highlighted: token.highlighted
    };
  });
}