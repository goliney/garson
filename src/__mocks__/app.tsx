import React from 'react';
import { render } from 'ink-testing-library';
import { Text } from 'ink';

const initialView = <Text>Initializing tests...</Text>;

export const app = render(initialView);

app.unmount = jest.fn().mockImplementation(() => app.rerender(initialView));
