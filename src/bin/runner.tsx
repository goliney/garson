import React from 'react';
import { Box, render, Instance } from 'ink';
import { GarsonConfig } from '../types';

let app: Instance;

export function runner({ results, prompts, action }: GarsonConfig) {
  if (!app) {
    app = render(<Box>Initializing...</Box>, {
      debug: false,
    });
  }

  const [{ prompt, key }, ...rest] = prompts;
  app.rerender(
    prompt(result => {
      app.rerender(<React.Fragment />); // clear the previous prompt from the screen
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
    }),
  );
}
