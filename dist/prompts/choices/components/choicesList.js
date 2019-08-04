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
Controlled list of choices. Indicates the active item
 */
function ChoicesList({
  items,
  activeItem,
  itemComponent = _item.Item
}) {
  return _react.default.createElement(_ink.Box, {
    flexDirection: "column"
  }, items.map(item => {
    const isSelected = item === activeItem;
    return _react.default.createElement(_ink.Box, {
      key: item.key || item.value
    }, _react.default.createElement(_indicator.Indicator, {
      isSelected: isSelected
    }), _react.default.createElement(itemComponent, {
      isSelected,
      item
    }));
  }));
}
//# sourceMappingURL=choicesList.js.map