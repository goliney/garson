"use strict";

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.array.sort");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listNodes = listNodes;
exports.fuzzySearchNodes = fuzzySearchNodes;
exports.highlightStringByScore = highlightStringByScore;

var _glob = _interopRequireDefault(require("glob"));

var _vscodeFuzzyScorer = require("vscode-fuzzy-scorer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function listNodes(_x) {
  return _listNodes.apply(this, arguments);
}

function _listNodes() {
  _listNodes = _asyncToGenerator(function* (pattern, options = {}) {
    return new Promise((resolve, reject) => {
      (0, _glob.default)(pattern, options, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  });
  return _listNodes.apply(this, arguments);
}

function fuzzySearchNodes(nodes, pattern) {
  if (!nodes) {
    return [];
  }

  if (!pattern) {
    return nodes.map(path => ({
      path,
      score: null
    }));
  }

  const query = (0, _vscodeFuzzyScorer.prepareQuery)(pattern);
  const cache = {};
  const results = [...nodes].sort((pathA, pathB) => (0, _vscodeFuzzyScorer.compareFilePathsByFuzzyScore)({
    pathA,
    pathB,
    query,
    cache
  }));
  return results.map(path => ({
    path,
    score: (0, _vscodeFuzzyScorer.scoreFilePathFuzzy)({
      path,
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