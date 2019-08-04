"use strict";

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FuzzyPathComponent = FuzzyPathComponent;
exports.fuzzyPath = fuzzyPath;

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _input = require("../input");

var _choicesList = require("../choices/components/choicesList");

var _useChoicesNavigation = require("../choices/use-choices-navigation");

var _helpers = require("../_helpers");

var _patternHighlightItem = require("./components/pattern-highlight-item");

var _utils = require("./utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

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

  const activeItem = (0, _useChoicesNavigation.useChoicesNavigation)(matches);
  const handleSubmit = (0, _react.useCallback)(() => {
    onSubmit(activeItem.value);
  }, [onSubmit, activeItem]);
  (0, _helpers.useEnterKeyHandler)(handleSubmit); // get the list of files based on the 'root' folder

  (0, _react.useEffect)(() => {
    (function () {
      var _getNodes = _asyncToGenerator(function* () {
        const calculatedNodes = yield (0, _utils.listNodes)(root);
        setNodes(calculatedNodes.filter(filter));
      });

      function getNodes() {
        return _getNodes.apply(this, arguments);
      }

      return getNodes;
    })()();
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
  }), matches && activeItem && _react.default.createElement(_choicesList.ChoicesList, {
    activeItem: activeItem,
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
//# sourceMappingURL=index.js.map