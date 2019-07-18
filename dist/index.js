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
    prompt: (key, _prompt) => promptHandler({
      results,
      key,
      prompt: _prompt,
      prompts
    }),
    action: function (_action) {
      function action(_x) {
        return _action.apply(this, arguments);
      }

      action.toString = function () {
        return _action.toString();
      };

      return action;
    }(action => actionHandler({
      results,
      prompts,
      action
    }))
  };
}

function promptHandler({
  results,
  key,
  prompt,
  prompts
}) {
  return garsonHandler({
    results,
    prompts: [...prompts, {
      key,
      prompt
    }]
  });
}

function actionHandler({
  results,
  prompts,
  action
}) {
  // The result of .action() is picked up by a runner
  return {
    results,
    prompts,
    action
  };
}
//# sourceMappingURL=index.js.map