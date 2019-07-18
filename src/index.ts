interface Results {
  [key: string]: any;
}

type key = string;

interface Prompt {
  key: key;
  prompt: any;
}

type prompts = Prompt[];

type action = () => void;

interface GarsonParams {
  results?: Results;
  prompts?: prompts;
}

interface PromptParams {
  results: Results;
  key: key;
  prompt: Prompt;
  prompts: prompts;
}

interface ActionParams {
  results: Results;
  prompts: prompts;
  action: action;
}

export function garson(results: Results) {
  return garsonHandler({ results });
}

function garsonHandler({ results = {}, prompts = [] }: GarsonParams) {
  return {
    prompt: (key: key, prompt: Prompt) => promptHandler({ results, key, prompt, prompts }),
    action: (action: action) => actionHandler({ results, prompts, action }),
  };
}

function promptHandler({ results, key, prompt, prompts }: PromptParams) {
  return garsonHandler({ results, prompts: [...prompts, { key, prompt }] });
}

function actionHandler({ results, prompts, action }: ActionParams) {
  // The result of .action() is picked up by a runner
  return {
    results,
    prompts,
    action,
  };
}
