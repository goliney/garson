import React from 'react';
import { Box, Text } from 'ink';
import * as scorer from 'vscode-fuzzy-scorer';
import { FuzzySearchItem, highlightStringByScore, HighlightToken } from '../utils';

interface HighlightFilePathItemProps {
  isSelected: boolean;
  item: {
    key?: string;
    label: string;
    value: FuzzySearchItem;
  };
}

export function HighlightFilePathItem({ isSelected, item }: HighlightFilePathItemProps) {
  const basename = scorer.basename(item.value.path);
  const dirname = scorer.dirname(item.value.path);

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
        <Text color={isSelected ? '#0057ff' : '#24526d'}>
          <HighlightedString tokens={basenameHighlighted} />
        </Text>
      </Box>
      <Box>
        <Text color={isSelected ? '#0057ff' : '#8ba2a5'}>
          <HighlightedString tokens={dirnameHighlighted} />
        </Text>
      </Box>
    </>
  );
}

function HighlightedString({ tokens }: { tokens: HighlightToken[] }) {
  return (
    <>
      {tokens.map(token => (
        <Text key={token.key} inverse={token.highlighted}>
          {token.value}
        </Text>
      ))}
    </>
  );
}
