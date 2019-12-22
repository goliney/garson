"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prompts = void 0;

var _input = require("./input");

var _choices = require("./choices");

var _multiChoices = require("./multi-choices");

var _fuzzyPath = require("./fuzzy-path");

const prompts = {
  input: _input.input,
  choices: _choices.choices,
  multiChoices: _multiChoices.multiChoices,
  fuzzyPath: _fuzzyPath.fuzzyPath
};
exports.prompts = prompts;