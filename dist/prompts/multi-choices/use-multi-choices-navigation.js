"use strict";

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.string.includes");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMultiChoicesNavigation = useMultiChoicesNavigation;

var _react = require("react");

var _helpers = require("../../_helpers");

var _keys = require("../../_helpers/keys");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useMultiChoicesNavigation(items, onChangeMiddleware = () => {}) {
  const _useState = (0, _react.useState)(items[0]),
        _useState2 = _slicedToArray(_useState, 2),
        highlightedItem = _useState2[0],
        setHighlightedItem = _useState2[1];

  const _useState3 = (0, _react.useState)([]),
        _useState4 = _slicedToArray(_useState3, 2),
        selectedItems = _useState4[0],
        setSelectedItems = _useState4[1]; // pre-select default items


  (0, _react.useEffect)(() => {
    setSelectedItems(items.filter(item => item.isSelected));
  }, [items]);
  const highlightPrevItem = (0, _react.useCallback)(() => {
    if (items.length === 0 || !highlightedItem) {
      return;
    }

    const indexOfHighlighted = items.indexOf(highlightedItem);
    const prevItemIndex = Math.max(indexOfHighlighted - 1, 0);
    setHighlightedItem(items[prevItemIndex]);
  }, [highlightedItem, items]);
  const highlightNextItem = (0, _react.useCallback)(() => {
    if (items.length === 0 || !highlightedItem) {
      return;
    }

    const indexOfHighlighted = items.indexOf(highlightedItem);
    const nextItemIndex = Math.min(indexOfHighlighted + 1, items.length - 1);
    setHighlightedItem(items[nextItemIndex]);
  }, [highlightedItem, items]);
  const toggleSelection = (0, _react.useCallback)(() => {
    const oldSelectedItems = items.filter(item => selectedItems.includes(item));
    const newSelectedItems = items.filter(item => {
      const isAlreadySelected = selectedItems.includes(item);
      const isHighlighted = item === highlightedItem;
      return isAlreadySelected && !isHighlighted || !isAlreadySelected && isHighlighted;
    });
    const onChangeMiddlewareResult = onChangeMiddleware(newSelectedItems, oldSelectedItems, items);
    setSelectedItems(onChangeMiddlewareResult || newSelectedItems);
  }, [highlightedItem, selectedItems, items, onChangeMiddleware]);
  const handleKey = (0, _react.useCallback)(key => {
    switch (key) {
      case _keys.ARROW_UP:
        highlightPrevItem();
        break;

      case _keys.ARROW_DOWN:
        highlightNextItem();
        break;

      case _keys.SPACE:
        toggleSelection();
        break;

      default:
        break;
    }
  }, [highlightPrevItem, highlightNextItem, toggleSelection]);
  (0, _helpers.useKeyHandler)(handleKey);
  return {
    highlightedItem,
    selectedItems
  };
}