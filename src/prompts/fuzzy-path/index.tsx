import React, { useState, useEffect, useCallback } from 'react';
import { Box } from 'ink';
import { listNodes, fuzzySearchNodes, NodesList } from './utils';
import { InputComponent } from '../input';
import { ChoicesComponent } from '../choices';
import { OnSubmitCallback } from '../../types';

interface FuzzyPath {
  message?: string;
  placeholder?: string;
  root: string;
}

interface FuzzyPathProps extends FuzzyPath {
  onSubmit: OnSubmitCallback;
}

type Nodes = NodesList | null;

const NODES_LIMIT = 7;

const DEFAULT_PLACEHOLDER = '(Use arrow keys or start typing)';

export function FuzzyPathComponent({
  message,
  placeholder = DEFAULT_PLACEHOLDER,
  root,
  onSubmit,
}: FuzzyPathProps) {
  const [nodes, setNodes] = useState<Nodes>(null);
  const [pattern, setPattern] = useState<string>('');

  useEffect(() => {
    async function getNodes() {
      const calculatedNodes = await listNodes(root);
      setNodes(fuzzySearchNodes(calculatedNodes, pattern));
    }
    getNodes();
  }, [root, pattern]);

  const handleSubmit = useCallback(
    value => {
      onSubmit(value);
    },
    [onSubmit],
  );

  return (
    <Box flexDirection="column">
      <InputComponent
        message={message}
        placeholder={placeholder}
        onChange={setPattern}
        onSubmit={() => {}}
      />
      {nodes && (
        <ChoicesComponent
          onSubmit={handleSubmit}
          items={nodes.slice(0, NODES_LIMIT).map(node => ({ label: node, value: node }))}
        />
      )}
    </Box>
  );
}

export function fuzzyPath({ message, root }: FuzzyPath) {
  return (onSubmit: OnSubmitCallback) => (
    <FuzzyPathComponent message={message} root={root} onSubmit={onSubmit} />
  );
}
