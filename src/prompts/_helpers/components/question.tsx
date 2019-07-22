import React from 'react';
import { Box, Color } from 'ink';

interface QuestionProps {
  message?: string;
}

export function Question({ message }: QuestionProps) {
  return (
    <Color green>
      <Box marginRight={1}>?</Box>
      {message && <Box marginRight={1}>{message}</Box>}
    </Color>
  );
}
