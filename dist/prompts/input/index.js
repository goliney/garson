"use strict";

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputComponent = InputComponent;
exports.input = input;

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _inkTextInput = _interopRequireDefault(require("ink-text-input"));

var _helpers = require("../_helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function InputComponent({
  message,
  placeholder,
  onChange,
  onSubmit
}) {
  const _useState = (0, _react.useState)(''),
        _useState2 = _slicedToArray(_useState, 2),
        value = _useState2[0],
        setValue = _useState2[1];

  const handleSubmit = (0, _react.useCallback)(submittedValue => {
    if (onSubmit) {
      onSubmit(submittedValue);
    }
  }, [onSubmit]);
  const handleChange = (0, _react.useCallback)(newValue => {
    setValue(newValue);

    if (onChange) {
      onChange(newValue);
    }
  }, [onChange]);
  return _react.default.createElement(_ink.Box, null, _react.default.createElement(_helpers.Question, {
    message: message
  }), _react.default.createElement(_inkTextInput.default, {
    value: value,
    onChange: handleChange,
    onSubmit: handleSubmit,
    placeholder: placeholder
  }));
}

function input({
  message,
  placeholder
}) {
  return onSubmit => _react.default.createElement(InputComponent, {
    message: message,
    placeholder: placeholder,
    onSubmit: onSubmit
  });
}