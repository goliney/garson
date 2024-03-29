"use strict";

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.array.from.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMultiChoicesNavigation = useMultiChoicesNavigation;

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.array.index-of.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

var _react = require("react");

var _helpers = require("../../_helpers");

var _keys = require("../../_helpers/keys");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useMultiChoicesNavigation(items, onChangeMiddleware = () => {
  return;
}) {
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