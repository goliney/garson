import React from 'react';
import { Text, Box } from 'ink';
import { app } from '../app';
import { Line } from '../_helpers';

interface PrintMessage {
  boxTitle?: string;
  message: string;
}

export function printMessage({ boxTitle, message }: PrintMessage) {
  app.rerender(
    <Box flexDirection="column" paddingBottom={1}>
      <Line message={boxTitle} />
      <Box paddingY={1}>
        <Text italic>{message}</Text>
      </Box>
      <Line />
    </Box>
  );
}
