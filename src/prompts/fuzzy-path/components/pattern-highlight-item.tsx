import React from 'react';
import { Color } from 'ink';
import { ItemProps } from '../../choices/components/item';

export function PatternHighlightItem({ isSelected, item }: ItemProps) {
  return <Color blue={isSelected}>{item.label}</Color>;
}
