"use strict";

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.weak-map.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FuzzyPathComponent = FuzzyPathComponent;
exports.fuzzyPath = fuzzyPath;

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.array.slice.js");

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _input = require("../input");

var _choicesList = require("../choices/components/choices-list");

var _useChoicesNavigation = require("../choices/use-choices-navigation");

var _helpers = require("../../_helpers");

var _highlightFilePathItem = require("./components/highlight-file-path-item");

var _utils = require("./utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

const MATCHES_LIMIT = 7;
const DEFAULT_PLACEHOLDER = '(Use arrow keys or start typing)';

function FuzzyPathComponent({
  message,
  placeholder = DEFAULT_PLACEHOLDER,
  pattern,
  options,
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
        fuzzyPattern = _useState6[0],
        setFuzzyPattern = _useState6[1];

  const highlightedItem = (0, _useChoicesNavigation.useChoicesNavigation)(matches);
  const handleSubmit = (0, _react.useCallback)(() => {
    onSubmit(highlightedItem.value);
  }, [onSubmit, highlightedItem]);
  (0, _helpers.useEnterKeyHandler)(handleSubmit); // get the list of files

  (0, _react.useEffect)(() => {
    (function () {
      var _getNodes = _asyncToGenerator(function* () {
        const calculatedNodes = yield (0, _utils.listNodes)(pattern, options);
        setNodes(calculatedNodes);
      });

      function getNodes() {
        return _getNodes.apply(this, arguments);
      }

      return getNodes;
    })()();
  }, [pattern, options]); // search files by fuzzyPattern

  (0, _react.useEffect)(() => {
    const searchResults = (0, _utils.fuzzySearchNodes)(nodes, fuzzyPattern);
    const searchResultsSliced = searchResults.slice(0, MATCHES_LIMIT).map(match => ({
      key: match.path,
      label: match.path,
      value: match
    }));
    setMatches(searchResultsSliced);
  }, [nodes, fuzzyPattern]);
  return /*#__PURE__*/_react.default.createElement(_ink.Box, {
    flexDirection: "column"
  }, /*#__PURE__*/_react.default.createElement(_input.InputComponent, {
    message: message,
    placeholder: placeholder,
    onChange: setFuzzyPattern
  }), matches && highlightedItem && /*#__PURE__*/_react.default.createElement(_choicesList.ChoicesList, {
    highlightedItem: highlightedItem,
    items: matches,
    itemComponent: _highlightFilePathItem.HighlightFilePathItem
  }));
}

function fuzzyPath({
  message,
  placeholder,
  pattern = '*',
  options
}) {
  return onSubmit => /*#__PURE__*/_react.default.createElement(FuzzyPathComponent, {
    message: message,
    placeholder: placeholder,
    pattern: pattern,
    options: options,
    onSubmit: onSubmit
  });
}