import React, { useState, useEffect, useCallback } from 'react';
import { Box, Color } from 'ink';
import { useKeyHandler } from '../use-key-handler';
import { listNodes } from './utils';
import { onSubmitCallback } from '../../types';

interface FuzzyPath {
  message: string;
  root: string;
}

interface FuzzyPathProps extends FuzzyPath {
  onSubmit: onSubmitCallback;
}

export function FuzzyPathComponent({ message, root, onSubmit }: FuzzyPathProps) {
  useEffect(() => {
    async function getNodes() {
      const nodes = await listNodes(root);
      console.log(nodes);
    }
    getNodes();
  }, []);

  return (
    <React.Fragment>
      <Box>
        <Color green>{message}</Color>
      </Box>
    </React.Fragment>
  );
}

export function fuzzyPath({ message, root }: FuzzyPath) {
  return (onSubmit: onSubmitCallback) => (
    <FuzzyPathComponent message={message} root={root} onSubmit={onSubmit} />
  );
}
