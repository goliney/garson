import React from 'react';
import { Box, Color } from 'ink';
import figures from 'figures';

interface IndicatorProps {
  isActive?: boolean;
  isSelected?: boolean;
}

export function Indicator({ isActive, isSelected }: IndicatorProps) {
  return (
    <Box marginRight={1} flexShrink={0}>
      {isActive ? <Color blue>{figures.square} </Color> : '  '}
      <Color blue={isActive}>{isSelected ? figures.circleFilled : figures.circle}</Color>
    </Box>
  );
}
