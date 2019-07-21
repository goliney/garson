import React from 'react';
import { Box, render } from 'ink';
import { GarsonConfig } from '../types';

const { rerender, unmount } = render(<Box>Initializing...</Box>, {
  debug: false,
});

export function runner({ results, prompts, action }: GarsonConfig) {
  const [{ prompt, key }, ...rest] = prompts;
  rerender(
    prompt(result => {
      rerender(<React.Fragment />); // clear the previous prompt from the screen
      const newResults = { ...results, [key]: result };
      if (rest.length === 0) {
        // it was the last prompt in a chain
        const actionResponse = action(newResults);
        if (actionResponse) {
          runner(actionResponse);
        } else {
          unmount();
        }
      } else {
        // there is another prompt
        runner({ results: newResults, prompts: rest, action });
      }
    }),
  );
}
