import React from 'react';
import { Box, Text } from 'ink';

interface QuestionProps {
  message?: string;
}

export function Question({ message }: QuestionProps) {
  return (
    <Box>
      <Box marginRight={1}>
        <Text color="green">?</Text>
      </Box>
      {message && (
        <Box marginRight={1}>
          <Text color="green">{message}</Text>
        </Box>
      )}
    </Box>
  );
}
