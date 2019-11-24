"use strict";

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useChoicesNavigation = useChoicesNavigation;

var _react = require("react");

var _helpers = require("../_helpers");

var _keys = require("../_helpers/keys");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useChoicesNavigation(items) {
  const _useState = (0, _react.useState)(items[0]),
        _useState2 = _slicedToArray(_useState, 2),
        activeItem = _useState2[0],
        setActiveItem = _useState2[1];

  (0, _react.useEffect)(() => {
    setActiveItem(items[0]);
  }, [items]);
  const selectPrevItem = (0, _react.useCallback)(() => {
    if (items.length === 0 || !activeItem) {
      return;
    }

    const indexOfActive = items.indexOf(activeItem);
    const prevItemIndex = Math.max(indexOfActive - 1, 0);
    setActiveItem(items[prevItemIndex]);
  }, [activeItem, items]);
  const selectNextItem = (0, _react.useCallback)(() => {
    if (items.length === 0 || !activeItem) {
      return;
    }

    const indexOfActive = items.indexOf(activeItem);
    const nextItemIndex = Math.min(indexOfActive + 1, items.length - 1);
    setActiveItem(items[nextItemIndex]);
  }, [activeItem, items]);
  const handleKey = (0, _react.useCallback)(key => {
    switch (key) {
      case _keys.ARROW_UP:
        selectPrevItem();
        break;

      case _keys.ARROW_DOWN:
        selectNextItem();
        break;

      default:
        break;
    }
  }, [selectPrevItem, selectNextItem]);
  (0, _helpers.useKeyHandler)(handleKey);
  return activeItem;
}