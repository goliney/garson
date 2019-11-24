import { KeyType, PromptCallback, Results, ActionCallback, GarsonHandlerParams } from './types';

export * from './prompts';
export * from './actions';

export function garson(results?: Results) {
  return garsonHandler({ results });
}

function garsonHandler({ results = {}, prompts = [] }: GarsonHandlerParams) {
  return {
    prompt: (key: KeyType, prompt: PromptCallback) =>
      garsonHandler({ results, prompts: [...prompts, { key, prompt }] }),
    action: (action: ActionCallback) => ({
      results,
      prompts,
      action,
    }),
  };
}
