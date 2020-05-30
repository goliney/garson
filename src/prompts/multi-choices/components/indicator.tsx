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
      {isHighlighted ? <Color hex="#0057ff">{figures.square} </Color> : '  '}
      <Color hex={isHighlighted ? '#0057ff' : ''}>
        {isSelected ? figures.circleFilled : figures.circle}
      </Color>
    </Box>
  );
}
