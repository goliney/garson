"use strict";

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runner = runner;

require("core-js/modules/es.array.slice.js");

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _app = require("../app");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function runner({
  results,
  prompts,
  action
}) {
  const _prompts = _toArray(prompts),
        _prompts$ = _prompts[0],
        prompt = _prompts$.prompt,
        key = _prompts$.key,
        rest = _prompts.slice(1);

  _app.app.rerender(prompt(result => {
    _app.app.rerender( /*#__PURE__*/_react.default.createElement(_ink.Box, null)); // clear the previous prompt from the screen


    const newResults = _objectSpread(_objectSpread({}, results), {}, {
      [key]: result
    });

    if (rest.length === 0) {
      // it was the last prompt in a chain
      const actionResponse = action(newResults);

      if (actionResponse) {
        runner(actionResponse);
      } else {
        _app.app.unmount();
      }
    } else {
      // there is another prompt
      runner({
        results: newResults,
        prompts: rest,
        action
      });
    }
  }));
}