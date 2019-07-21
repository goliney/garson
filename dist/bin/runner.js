"use strict";

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.object.get-own-property-descriptors");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runner = runner;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

const _render = (0, _ink.render)(_react.default.createElement(_ink.Box, null, "Initializing..."), {
  debug: false
}),
      rerender = _render.rerender,
      unmount = _render.unmount;

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

  rerender(prompt(result => {
    rerender(_react.default.createElement(_react.default.Fragment, null)); // clear the previous prompt from the screen

    const newResults = _objectSpread({}, results, {
      [key]: result
    });

    if (rest.length === 0) {
      // it was the last prompt in a chain
      const actionResponse = action(newResults);

      if (actionResponse) {
        runner(actionResponse);
      } else {
        unmount();
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
//# sourceMappingURL=runner.js.map