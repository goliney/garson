import React from 'react';
import { Box, Text } from 'ink';
import figures from 'figures';

interface IndicatorProps {
  isHighlighted?: boolean;
  isSelected?: boolean;
}

export function Indicator({ isHighlighted, isSelected }: IndicatorProps) {
  return (
    <Box marginRight={1} flexShrink={0}>
      {isHighlighted ? <Text color="#0057ff">{figures.square} </Text> : <Text>{'  '}</Text>}
      <Text color={isHighlighted ? '#0057ff' : ''}>
        {isSelected ? figures.circleFilled : figures.circle}
      </Text>
    </Box>
  );
}
