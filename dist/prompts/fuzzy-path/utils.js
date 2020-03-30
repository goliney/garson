"use strict";

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.object.get-own-property-descriptors");

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

var _fzSearch = _interopRequireDefault(require("fz-search"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const HIGHLIGHT_SYMBOL_START = '<HIGHLIGHT_SYMBOL_START>';
exports.HIGHLIGHT_SYMBOL_START = HIGHLIGHT_SYMBOL_START;
const HIGHLIGHT_SYMBOL_END = '<HIGHLIGHT_SYMBOL_END>';
exports.HIGHLIGHT_SYMBOL_END = HIGHLIGHT_SYMBOL_END;

function listNodes(nodePath, root) {
  const relativeRoot = root || nodePath;

  try {
    const nodes = _fs.default.readdirSync(nodePath);

    const currentNode = [{
      isDir: true,
      path: nodePath,
      relativePath: _path.default.relative(relativeRoot, nodePath),
      highlightedRelativePath: ''
    }];

    if (nodes.length === 0) {
      return currentNode;
    } // recursively get child nodes


    const subNodes = nodes.map(nodeName => listNodes(_path.default.join(nodePath, nodeName), relativeRoot));
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
}

function fuzzySearchNodes(nodes, pattern) {
  if (!nodes) {
    return [];
  }

  if (!pattern) {
    return nodes.map(node => _objectSpread({}, node));
  }

  const fuzzy = new _fzSearch.default({
    source: nodes,
    keys: 'relativePath',
    token_field_min_length: 1,
    // start searching with a query this long
    highlight_bridge_gap: 0,
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