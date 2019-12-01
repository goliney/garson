"use strict";

require("core-js/modules/es.array.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLineFullOf = getLineFullOf;

function getLineFullOf(char) {
  return [...Array(process.stdout.columns)].join(char);
}