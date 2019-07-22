"use strict";

require("core-js/modules/es.symbol.description");

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

var _utils = require("./utils");

var _input = require("../input");

var _choices = require("../choices");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

const NODES_LIMIT = 7;
const DEFAULT_PLACEHOLDER = '(Use arrow keys or start typing)';

function FuzzyPathComponent({
  message,
  placeholder = DEFAULT_PLACEHOLDER,
  root,
  onSubmit
}) {
  const _useState = (0, _react.useState)(null),
        _useState2 = _slicedToArray(_useState, 2),
        nodes = _useState2[0],
        setNodes = _useState2[1];

  const _useState3 = (0, _react.useState)(''),
        _useState4 = _slicedToArray(_useState3, 2),
        pattern = _useState4[0],
        setPattern = _useState4[1];

  (0, _react.useEffect)(() => {
    function getNodes() {
      return _getNodes.apply(this, arguments);
    }

    function _getNodes() {
      _getNodes = _asyncToGenerator(function* () {
        const calculatedNodes = yield (0, _utils.listNodes)(root);
        setNodes((0, _utils.fuzzySearchNodes)(calculatedNodes, pattern));
      });
      return _getNodes.apply(this, arguments);
    }

    getNodes();
  }, [root, pattern]);
  const handleSubmit = (0, _react.useCallback)(value => {
    onSubmit(value);
  }, [onSubmit]);
  return _react.default.createElement(_ink.Box, {
    flexDirection: "column"
  }, _react.default.createElement(_input.InputComponent, {
    message: message,
    placeholder: placeholder,
    onChange: setPattern,
    onSubmit: () => {}
  }), nodes && _react.default.createElement(_choices.ChoicesComponent, {
    onSubmit: handleSubmit,
    items: nodes.slice(0, NODES_LIMIT).map(node => ({
      label: node,
      value: node
    }))
  }));
}

function fuzzyPath({
  message,
  root
}) {
  return onSubmit => _react.default.createElement(FuzzyPathComponent, {
    message: message,
    root: root,
    onSubmit: onSubmit
  });
}
//# sourceMappingURL=index.js.map