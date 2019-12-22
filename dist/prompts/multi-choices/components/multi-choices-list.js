"use strict";

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.map");

require("core-js/modules/es.string.includes");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiChoicesList = MultiChoicesList;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _indicator = require("./indicator");

var _item = require("./item");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
Controlled list of choices. Indicates the highlighted and selected items
 */
function MultiChoicesList({
  items,
  highlightedItem,
  selectedItems,
  itemComponent = _item.Item
}) {
  return _react.default.createElement(_ink.Box, {
    flexDirection: "column"
  }, items.map(item => {
    const isHighlighted = item === highlightedItem;
    const isSelected = selectedItems.includes(item);
    return _react.default.createElement(_ink.Box, {
      key: item.key || item.value
    }, _react.default.createElement(_indicator.Indicator, {
      isSelected: isSelected,
      isHighlighted: isHighlighted
    }), _react.default.createElement(itemComponent, {
      isHighlighted,
      item
    }));
  }));
}