"use strict";

require("core-js/modules/es.array.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  garson: true
};
exports.garson = garson;

var _prompts = require("./prompts");

Object.keys(_prompts).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _prompts[key];
    }
  });
});

var _actions = require("./actions");

Object.keys(_actions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _actions[key];
    }
  });
});

function garson(results) {
  return garsonHandler({
    results
  });
}

function garsonHandler({
  results = {},
  prompts = []
}) {
  return {
    prompt: (key, _prompt) => garsonHandler({
      results,
      prompts: [...prompts, {
        key,
        prompt: _prompt
      }]
    }),
    action: _action => ({
      results,
      prompts,
      action: _action
    })
  };
}