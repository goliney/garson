"use strict";

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FuzzyPathComponent = FuzzyPathComponent;
exports.fuzzyPath = fuzzyPath;

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _input = require("../input");

var _choicesList = require("../choices/components/choices-list");

var _useChoicesNavigation = require("../choices/use-choices-navigation");

var _helpers = require("../../_helpers");

var _patternHighlightItem = require("./components/pattern-highlight-item");

var _utils = require("./utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

const MATCHES_LIMIT = 7;
const DEFAULT_PLACEHOLDER = '(Use arrow keys or start typing)';

function FuzzyPathComponent({
  message,
  placeholder = DEFAULT_PLACEHOLDER,
  root,
  filter,
  onSubmit
}) {
  const _useState = (0, _react.useState)(null),
        _useState2 = _slicedToArray(_useState, 2),
        nodes = _useState2[0],
        setNodes = _useState2[1];

  const _useState3 = (0, _react.useState)([]),
        _useState4 = _slicedToArray(_useState3, 2),
        matches = _useState4[0],
        setMatches = _useState4[1];

  const _useState5 = (0, _react.useState)(''),
        _useState6 = _slicedToArray(_useState5, 2),
        pattern = _useState6[0],
        setPattern = _useState6[1];

  const highlightedItem = (0, _useChoicesNavigation.useChoicesNavigation)(matches);
  const handleSubmit = (0, _react.useCallback)(() => {
    onSubmit(highlightedItem.value);
  }, [onSubmit, highlightedItem]);
  (0, _helpers.useEnterKeyHandler)(handleSubmit); // get the list of files based on the 'root' folder

  (0, _react.useEffect)(() => {
    let calculatedNodes = (0, _utils.listNodes)(root);

    if (filter) {
      calculatedNodes = calculatedNodes.filter(filter);
    }

    setNodes(calculatedNodes);
  }, [root, filter]); // search files by pattern

  (0, _react.useEffect)(() => {
    const searchResults = (0, _utils.fuzzySearchNodes)(nodes, pattern);
    const searchResultsSliced = searchResults.slice(0, MATCHES_LIMIT).map(match => ({
      key: match.path,
      label: match.relativePath,
      value: match
    }));
    setMatches(searchResultsSliced);
  }, [nodes, pattern]);
  return _react.default.createElement(_ink.Box, {
    flexDirection: "column"
  }, _react.default.createElement(_input.InputComponent, {
    message: message,
    placeholder: placeholder,
    onChange: setPattern
  }), matches && highlightedItem && _react.default.createElement(_choicesList.ChoicesList, {
    highlightedItem: highlightedItem,
    items: matches,
    itemComponent: _patternHighlightItem.PatternHighlightItem
  }));
}

function fuzzyPath({
  message,
  placeholder,
  root,
  filter
}) {
  return onSubmit => _react.default.createElement(FuzzyPathComponent, {
    message: message,
    placeholder: placeholder,
    root: root,
    filter: filter,
    onSubmit: onSubmit
  });
}