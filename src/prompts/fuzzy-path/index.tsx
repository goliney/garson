import React, { useState, useEffect, useCallback } from 'react';
import { Box } from 'ink';
import { IOptions } from 'glob';
import { OnSubmitCallback } from '../../types';
import { InputComponent } from '../input';
import { ChoicesList } from '../choices/components/choices-list';
import { ChoiceOption } from '../choices/components/item';
import { useChoicesNavigation } from '../choices/use-choices-navigation';
import { useEnterKeyHandler } from '../../_helpers';
import { HighlightFilePathItem } from './components/highlight-file-path-item';
import { listNodes, fuzzySearchNodes } from './utils';

interface FuzzyPath {
  message?: string;
  placeholder?: string;
  pattern: string;
  options?: IOptions;
}

interface FuzzyPathProps extends FuzzyPath {
  onSubmit: OnSubmitCallback;
}

type PathNodesState = string[] | null;

type ChoiceOptionsState = ChoiceOption[];

const MATCHES_LIMIT = 7;

const DEFAULT_PLACEHOLDER = '(Use arrow keys or start typing)';

export function FuzzyPathComponent({
  message,
  placeholder = DEFAULT_PLACEHOLDER,
  pattern,
  options,
  onSubmit,
}: FuzzyPathProps) {
  const [nodes, setNodes] = useState<PathNodesState>(null);
  const [matches, setMatches] = useState<ChoiceOptionsState>([]);
  const [fuzzyPattern, setFuzzyPattern] = useState<string>('');

  const highlightedItem = useChoicesNavigation(matches);

  const handleSubmit = useCallback(() => {
    onSubmit(highlightedItem.value);
  }, [onSubmit, highlightedItem]);

  useEnterKeyHandler(handleSubmit);

  // get the list of files
  useEffect(() => {
    (async function getNodes() {
      const calculatedNodes = await listNodes(pattern, options);
      setNodes(calculatedNodes);
    })();
  }, [pattern, options]);

  // search files by fuzzyPattern
  useEffect(() => {
    const searchResults = fuzzySearchNodes(nodes, fuzzyPattern);
    const searchResultsSliced = searchResults
      .slice(0, MATCHES_LIMIT)
      .map(match => ({ key: match.path, label: match.path, value: match }));
    setMatches(searchResultsSliced);
  }, [nodes, fuzzyPattern]);

  return (
    <Box flexDirection="column">
      <InputComponent message={message} placeholder={placeholder} onChange={setFuzzyPattern} />
      {matches && highlightedItem && (
        <ChoicesList
          highlightedItem={highlightedItem}
          items={matches}
          itemComponent={HighlightFilePathItem}
        />
      )}
    </Box>
  );
}

export function fuzzyPath({ message, placeholder, pattern, options }: FuzzyPath) {
  return (onSubmit: OnSubmitCallback) => (
    <FuzzyPathComponent
      message={message}
      placeholder={placeholder}
      pattern={pattern}
      options={options}
      onSubmit={onSubmit}
    />
  );
}
