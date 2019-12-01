import React from 'react';
import { Text, Box } from 'ink';
import { app } from '../bin/runner';
import { Line } from '../_helpers';

interface PrintMessage {
  boxTitle?: string;
  message: string;
}

function printMessage({ boxTitle, message }: PrintMessage) {
  app.rerender(
    <Box flexDirection="column" paddingBottom={1}>
      <Line message={boxTitle} />
      <Text italic>
        <Box paddingY={1}>{message}</Box>
      </Text>
      <Line />
    </Box>,
  );
}

export { printMessage };
