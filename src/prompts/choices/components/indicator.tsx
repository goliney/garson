import React from 'react';
import { Box, Color } from 'ink';
import figures from 'figures';

interface IndicatorProps {
  isSelected?: boolean;
}

export function Indicator({ isSelected }: IndicatorProps) {
  return (
    <Box marginRight={1} flexShrink={0}>
      {isSelected ? <Color hex="#0057ff">{figures.square}</Color> : ' '}
    </Box>
  );
}
