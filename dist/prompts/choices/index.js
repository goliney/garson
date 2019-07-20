"use strict";

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChoicesComponent = ChoicesComponent;
exports.choices = choices;

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _keys = require("../keys");

var _useKeyHandler = require("../use-key-handler");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ChoicesComponent({
  message,
  items,
  onSubmit
}) {
  const _useState = (0, _react.useState)(items[0]),
        _useState2 = _slicedToArray(_useState, 2),
        activeItem = _useState2[0],
        setActiveItem = _useState2[1];

  (0, _react.useEffect)(() => {
    setActiveItem(items[0]);
  }, [items]);
  const selectNextItem = (0, _react.useCallback)(() => {
    const indexOfActive = items.indexOf(activeItem);
    const nextItemIndex = Math.min(indexOfActive + 1, items.length - 1);
    setActiveItem(items[nextItemIndex]);
  }, [activeItem, items]);
  const selectPrevItem = (0, _react.useCallback)(() => {
    const indexOfActive = items.indexOf(activeItem);
    const prevItemIndex = Math.max(indexOfActive - 1, 0);
    setActiveItem(items[prevItemIndex]);
  }, [activeItem, items]);
  const submitResult = (0, _react.useCallback)(() => {
    onSubmit(activeItem.value);
  }, [activeItem, onSubmit]);
  (0, _useKeyHandler.useKeyHandler)(data => {
    const s = String(data);

    switch (s) {
      case _keys.ARROW_UP:
        selectPrevItem();
        break;

      case _keys.ARROW_DOWN:
        selectNextItem();
        break;

      case _keys.ENTER:
        submitResult();
        break;

      default:
        break;
    }
  });
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ink.Box, null, _react.default.createElement(_ink.Color, {
    green: true
  }, message)), items.map(item => _react.default.createElement(_ink.Box, {
    key: item.value
  }, item === activeItem && _react.default.createElement(_ink.Color, {
    blue: true
  }, item.label), item !== activeItem && _react.default.createElement(_ink.Color, {
    gray: true
  }, item.label))));
}

function choices({
  message,
  items
}) {
  return onSubmit => _react.default.createElement(ChoicesComponent, {
    message: message,
    items: items,
    onSubmit: onSubmit
  });
}
//# sourceMappingURL=index.js.map