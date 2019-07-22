export type KeyType = string;

export type OnSubmitCallback = (result: any) => void;

export type PromptCallback = (onSubmit: OnSubmitCallback) => JSX.Element;

export type PromptKeyPairs = PromptKeyPair[];

// action should return either nothing or another garson config
export type ActionCallback = (results: Results) => GarsonConfig | void;

export interface PromptKeyPair {
  key: KeyType;
  prompt: PromptCallback;
}

export interface Results {
  [key: string]: any;
}

export interface GarsonHandlerParams {
  results?: Results;
  prompts?: PromptKeyPairs;
}

export interface GarsonConfig {
  results?: Results;
  prompts: PromptKeyPairs;
  action: ActionCallback;
}
