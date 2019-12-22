import React from 'react';
import { Box, Color } from 'ink';
import figures from 'figures';

interface IndicatorProps {
  isHighlighted?: boolean;
  isSelected?: boolean;
}

export function Indicator({ isHighlighted, isSelected }: IndicatorProps) {
  return (
    <Box marginRight={1} flexShrink={0}>
      {isHighlighted ? <Color blue>{figures.square} </Color> : '  '}
      <Color blue={isHighlighted}>{isSelected ? figures.circleFilled : figures.circle}</Color>
    </Box>
  );
}
