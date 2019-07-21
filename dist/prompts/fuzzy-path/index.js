"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FuzzyPathComponent = FuzzyPathComponent;
exports.fuzzyPath = fuzzyPath;

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _utils = require("./utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function FuzzyPathComponent({
  message,
  root,
  onSubmit
}) {
  (0, _react.useEffect)(() => {
    function getNodes() {
      return _getNodes.apply(this, arguments);
    }

    function _getNodes() {
      _getNodes = _asyncToGenerator(function* () {
        const nodes = yield (0, _utils.listNodes)(root);
        console.log(nodes);
      });
      return _getNodes.apply(this, arguments);
    }

    getNodes();
  }, []);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ink.Box, null, _react.default.createElement(_ink.Color, {
    green: true
  }, message)));
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