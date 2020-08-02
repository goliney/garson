"use strict";

require("core-js/modules/es.array.map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HighlightFilePathItem = HighlightFilePathItem;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var scorer = _interopRequireWildcard(require("vscode-fuzzy-scorer"));

var _utils = require("../utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HighlightFilePathItem({
  isSelected,
  item
}) {
  const basename = scorer.basename(item.value.relativePath);
  const dirname = scorer.dirname(item.value.relativePath);
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

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ink.Box, {
    paddingRight: 2
  }, _react.default.createElement(_ink.Text, {
    color: isSelected ? '#0057ff' : '#24526d'
  }, _react.default.createElement(HighlightedString, {
    tokens: basenameHighlighted
  }))), _react.default.createElement(_ink.Box, null, _react.default.createElement(_ink.Text, {
    color: isSelected ? '#0057ff' : '#8ba2a5'
  }, _react.default.createElement(HighlightedString, {
    tokens: dirnameHighlighted
  }))));
}

function HighlightedString({
  tokens
}) {
  return _react.default.createElement(_react.default.Fragment, null, tokens.map(token => _react.default.createElement(_ink.Text, {
    key: token.key,
    inverse: token.highlighted
  }, token.value)));
}