import React, { useState, useEffect, useCallback } from 'react';
import { Box } from 'ink';
import { OnSubmitCallback } from '../../types';
import { InputComponent } from '../input';
import { ChoicesList } from '../choices/components/choices-list';
import { ChoiceOption } from '../choices/components/item';
import { useChoicesNavigation } from '../choices/use-choices-navigation';
import { useEnterKeyHandler } from '../../_helpers';
import { PatternHighlightItem } from './components/pattern-highlight-item';
import { listNodes, fuzzySearchNodes, PathNode } from './utils';

interface FuzzyPath {
  message?: string;
  placeholder?: string;
  root: string;
  filter?: (node: PathNode) => boolean;
}

interface FuzzyPathProps extends FuzzyPath {
  onSubmit: OnSubmitCallback;
}

type PathNodesState = PathNode[] | null;

type ChoiceOptionsState = ChoiceOption[];

const MATCHES_LIMIT = 7;

const DEFAULT_PLACEHOLDER = '(Use arrow keys or start typing)';

export function FuzzyPathComponent({
  message,
  placeholder = DEFAULT_PLACEHOLDER,
  root,
  filter,
  onSubmit,
}: FuzzyPathProps) {
  const [nodes, setNodes] = useState<PathNodesState>(null);
  const [matches, setMatches] = useState<ChoiceOptionsState>([]);
  const [pattern, setPattern] = useState<string>('');

  const highlightedItem = useChoicesNavigation(matches);

  const handleSubmit = useCallback(() => {
    onSubmit(highlightedItem.value);
  }, [onSubmit, highlightedItem]);

  useEnterKeyHandler(handleSubmit);

  // get the list of files based on the 'root' folder
  useEffect(() => {
    let calculatedNodes = listNodes(root);
    if (filter) {
      calculatedNodes = calculatedNodes.filter(filter);
    }
    setNodes(calculatedNodes);
  }, [root, filter]);

  // search files by pattern
  useEffect(() => {
    const searchResults = fuzzySearchNodes(nodes, pattern);
    const searchResultsSliced = searchResults
      .slice(0, MATCHES_LIMIT)
      .map(match => ({ key: match.path, label: match.relativePath, value: match }));
    setMatches(searchResultsSliced);
  }, [nodes, pattern]);

  return (
    <Box flexDirection="column">
      <InputComponent message={message} placeholder={placeholder} onChange={setPattern} />
      {matches && highlightedItem && (
        <ChoicesList
          highlightedItem={highlightedItem}
          items={matches}
          itemComponent={PatternHighlightItem}
        />
      )}
    </Box>
  );
}

export function fuzzyPath({ message, placeholder, root, filter }: FuzzyPath) {
  return (onSubmit: OnSubmitCallback) => (
    <FuzzyPathComponent
      message={message}
      placeholder={placeholder}
      root={root}
      filter={filter}
      onSubmit={onSubmit}
    />
  );
}
