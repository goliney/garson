import React from 'react';
import { Color } from 'ink';
import { ItemProps } from '../../choices/components/item';
import { parseHighlightedString } from '../utils';

export function PatternHighlightItem({ isSelected, item }: ItemProps) {
  const tokens = parseHighlightedString(item.value.highlightedRelativePath || item.label);
  return (
    <Color blue={isSelected}>
      {tokens.map(token => (
        <Color key={token.key} inverse={token.highlighted}>
          {token.value}
        </Color>
      ))}
    </Color>
  );
}
