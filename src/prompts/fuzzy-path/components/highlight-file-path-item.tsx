import React from 'react';
import { Box, Color } from 'ink';
import * as scorer from 'vscode-fuzzy-scorer';
import { ItemProps } from '../../choices/components/item';
import { highlightStringByScore, HighlightToken } from '../utils';

export function HighlightFilePathItem({ isSelected, item }: ItemProps) {
  const basename = scorer.basename(item.value.relativePath);
  const dirname = scorer.dirname(item.value.relativePath);

  let basenameHighlighted = [{ key: basename, value: basename, highlighted: false }];
  if (
    basename &&
    item.value.score &&
    item.value.score.labelMatch &&
    item.value.score.labelMatch.length
  ) {
    basenameHighlighted = highlightStringByScore(basename, item.value.score.labelMatch);
  }

  let dirnameHighlighted = [{ key: dirname, value: dirname, highlighted: false }];
  if (
    dirname &&
    item.value.score &&
    item.value.score.descriptionMatch &&
    item.value.score.descriptionMatch.length
  ) {
    dirnameHighlighted = highlightStringByScore(dirname, item.value.score.descriptionMatch);
  }

  return (
    <>
      <Box paddingRight={2}>
        <Color hex={isSelected ? '#0057ff' : '#24526d'}>
          <HighlightedString tokens={basenameHighlighted} />
        </Color>
      </Box>
      <Box>
        <Color hex={isSelected ? '#0057ff' : '#8ba2a5'}>
          <HighlightedString tokens={dirnameHighlighted} />
        </Color>
      </Box>
    </>
  );
}

function HighlightedString({ tokens }: { tokens: HighlightToken[] }) {
  return (
    <>
      {tokens.map(token => (
        <Color key={token.key} inverse={token.highlighted}>
          {token.value}
        </Color>
      ))}
    </>
  );
}
