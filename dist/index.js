"use strict";

require("core-js/modules/es.array.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.garson = garson;

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