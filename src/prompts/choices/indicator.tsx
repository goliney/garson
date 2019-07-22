import React from 'react';
import { Box, Color } from 'ink';
import figures from 'figures';
import { IndicatorProps } from 'ink-select-input';

export function Indicator({ isSelected }: IndicatorProps) {
  return <Box marginRight={1}>{isSelected ? <Color blue>{figures.square}</Color> : ' '}</Box>;
}
