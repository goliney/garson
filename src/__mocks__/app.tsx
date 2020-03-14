import React from 'react';
import { render } from 'ink-testing-library';
import { Box } from 'ink';

const initialView = <Box>Initializing tests...</Box>;

export const app = render(initialView);

app.unmount = jest.fn().mockImplementation(() => app.rerender(initialView));
