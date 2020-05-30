"use strict";

require("core-js/modules/es.array.map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChoicesList = ChoicesList;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _indicator = require("./indicator");

var _item = require("./item");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
Controlled list of choices. Indicates the highlighted item
 */
function ChoicesList({
  items,
  highlightedItem,
  isNumericInputEnabled,
  itemComponent = _item.Item
}) {
  return _react.default.createElement(_ink.Box, {
    flexDirection: "column"
  }, items.map((item, index) => {
    const isSelected = item === highlightedItem;
    return _react.default.createElement(_ink.Box, {
      key: item.key || item.value
    }, _react.default.createElement(_indicator.Indicator, {
      isSelected: isSelected
    }), isNumericInputEnabled && _react.default.createElement(_ink.Color, {
      hex: isSelected ? '#0057ff' : ''
    }, index + 1, ". "), _react.default.createElement(itemComponent, {
      isSelected,
      item
    }));
  }));
}