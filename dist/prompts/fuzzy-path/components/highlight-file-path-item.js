"use strict";

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.weak-map.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HighlightFilePathItem = HighlightFilePathItem;

require("core-js/modules/es.array.map.js");

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var scorer = _interopRequireWildcard(require("vscode-fuzzy-scorer"));

var _utils = require("../utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HighlightFilePathItem({
  isSelected,
  item
}) {
  const basename = scorer.basename(item.value.path);
  const dirname = scorer.dirname(item.value.path);
  let basenameHighlighted = [{
    key: basename,
    value: basename,
    highlighted: false
  }];

  if (basename && item.value.score && item.value.score.labelMatch && item.value.score.labelMatch.length) {
    basenameHighlighted = (0, _utils.highlightStringByScore)(basename, item.value.score.labelMatch);
  }

  let dirnameHighlighted = [{
    key: dirname,
    value: dirname,
    highlighted: false
  }];

  if (dirname && item.value.score && item.value.score.descriptionMatch && item.value.score.descriptionMatch.length) {
    dirnameHighlighted = (0, _utils.highlightStringByScore)(dirname, item.value.score.descriptionMatch);
  }

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ink.Box, {
    paddingRight: 2
  }, /*#__PURE__*/_react.default.createElement(_ink.Text, {
    color: isSelected ? '#0057ff' : '#24526d'
  }, /*#__PURE__*/_react.default.createElement(HighlightedString, {
    tokens: basenameHighlighted
  }))), /*#__PURE__*/_react.default.createElement(_ink.Box, null, /*#__PURE__*/_react.default.createElement(_ink.Text, {
    color: isSelected ? '#0057ff' : '#8ba2a5'
  }, /*#__PURE__*/_react.default.createElement(HighlightedString, {
    tokens: dirnameHighlighted
  }))));
}

function HighlightedString({
  tokens
}) {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, tokens.map(token => /*#__PURE__*/_react.default.createElement(_ink.Text, {
    key: token.key,
    inverse: token.highlighted
  }, token.value)));
}