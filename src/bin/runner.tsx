import React from 'react';
import { Box } from 'ink';
import { app } from '../app';
import { GarsonConfig } from '../types';

export function runner({ results, prompts, action }: GarsonConfig) {
  const [{ prompt, key }, ...rest] = prompts;
  app.rerender(
    prompt(result => {
      app.rerender(<Box />); // clear the previous prompt from the screen
      const newResults = { ...results, [key]: result };
      if (rest.length === 0) {
        // it was the last prompt in a chain
        const actionResponse = action(newResults);
        if (actionResponse) {
          runner(actionResponse);
        } else {
          app.unmount();
        }
      } else {
        // there is another prompt
        runner({ results: newResults, prompts: rest, action });
      }
    })
  );
}
