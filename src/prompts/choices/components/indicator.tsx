import React from 'react';
import { Box, Text } from 'ink';
import figures from 'figures';

interface IndicatorProps {
  isSelected?: boolean;
}

export function Indicator({ isSelected }: IndicatorProps) {
  return (
    <Box marginRight={1} flexShrink={0}>
      {isSelected ? <Text color="#0057ff">{figures.square}</Text> : <Text> </Text>}
    </Box>
  );
}
