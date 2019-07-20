import { keyType, promptCallback, Results, actionCallback, GarsonHandlerParams } from './types';

export function garson(results?: Results) {
  return garsonHandler({ results });
}

function garsonHandler({ results = {}, prompts = [] }: GarsonHandlerParams) {
  return {
    prompt: (key: keyType, prompt: promptCallback) =>
      garsonHandler({ results, prompts: [...prompts, { key, prompt }] }),
    action: (action: actionCallback) => ({
      results,
      prompts,
      action,
    }),
  };
}
