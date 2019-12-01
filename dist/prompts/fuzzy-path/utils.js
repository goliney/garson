"use strict";

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.search");

require("core-js/modules/es.string.split");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listNodes = listNodes;
exports.fuzzySearchNodes = fuzzySearchNodes;
exports.parseHighlightedString = parseHighlightedString;
exports.HIGHLIGHT_SYMBOL_END = exports.HIGHLIGHT_SYMBOL_START = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _util = _interopRequireDefault(require("util"));

var _fzSearch = _interopRequireDefault(require("fz-search"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const readdir = _util.default.promisify(_fs.default.readdir);

const HIGHLIGHT_SYMBOL_START = '<HIGHLIGHT_SYMBOL_START>';
exports.HIGHLIGHT_SYMBOL_START = HIGHLIGHT_SYMBOL_START;
const HIGHLIGHT_SYMBOL_END = '<HIGHLIGHT_SYMBOL_END>';
exports.HIGHLIGHT_SYMBOL_END = HIGHLIGHT_SYMBOL_END;

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
        highlightedRelativePath: ''
      }];

      if (nodes.length === 0) {
        return currentNode;
      }

      const nodesWithPath = nodes.map(nodeName => listNodes(_path.default.join(nodePath, nodeName), relativeRoot));
      const subNodes = yield Promise.all(nodesWithPath);
      return subNodes.reduce((acc, val) => acc.concat(val), currentNode);
    } catch (err) {
      if (err.code === 'ENOTDIR') {
        return [{
          isDir: false,
          path: nodePath,
          relativePath: _path.default.relative(relativeRoot, nodePath),
          highlightedRelativePath: ''
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
    return nodes.map(node => _objectSpread({}, node, {
      indices: []
    }));
  }

  const fuzzy = new _fzSearch.default({
    source: nodes,
    keys: 'relativePath',
    token_field_min_length: 1,
    // start searching with a query this long
    highlight_before: HIGHLIGHT_SYMBOL_START,
    highlight_after: HIGHLIGHT_SYMBOL_END
  });
  const results = fuzzy.search(pattern);
  return results.map(item => _objectSpread({}, item, {
    highlightedRelativePath: fuzzy.highlight(item.relativePath)
  }));
}

function parseHighlightedString(stringWithHighlights) {
  /* eslint-disable no-plusplus */
  let key = 0;
  return stringWithHighlights.split(HIGHLIGHT_SYMBOL_START) // RegExps are hard
  .filter(match => !!match).reduce((acc, match) => {
    if (match.includes(HIGHLIGHT_SYMBOL_END)) {
      const _match$split = match.split(HIGHLIGHT_SYMBOL_END),
            _match$split2 = _slicedToArray(_match$split, 2),
            highlightedValue = _match$split2[0],
            value = _match$split2[1]; // eslint-disable-next-line no-plusplus


      acc.push({
        value: highlightedValue,
        highlighted: true,
        key: key++
      });
      acc.push({
        value,
        highlighted: false,
        key: key++
      });
    } else {
      acc.push({
        value: match,
        highlighted: false,
        key: key++
      });
    }

    return acc;
  }, []);
  /* eslint-enable no-plusplus */
}