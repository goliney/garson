export type keyType = string;

export type onSubmitCallback = (result: any) => void;

export type promptCallback = (onSubmit: onSubmitCallback) => JSX.Element;

export type promptKeyPairs = PromptKeyPair[];

// action should return either nothing or another garson config
export type actionCallback = (results: Results) => GarsonConfig | void;

export interface PromptKeyPair {
  key: keyType;
  prompt: promptCallback;
}

export interface Results {
  [key: string]: any;
}

export interface GarsonHandlerParams {
  results?: Results;
  prompts?: promptKeyPairs;
}

export interface GarsonConfig {
  results?: Results;
  prompts: promptKeyPairs;
  action: actionCallback;
}
