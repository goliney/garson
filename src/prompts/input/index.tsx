import React, { useState, useCallback } from 'react';
import { Box, Color } from 'ink';
import TextInput from 'ink-text-input';
import { onSubmitCallback } from '../../types';

interface Input {
  message?: string;
}

interface InputProps extends Input {
  onSubmit: onSubmitCallback;
}

export function InputComponent({ message, onSubmit }: InputProps) {
  const [value, setValue] = useState('');

  const handleSubmit = useCallback(
    submittedValue => {
      onSubmit(submittedValue);
    },
    [onSubmit],
  );

  return (
    <Box>
      {message && (
        <Box marginRight={1}>
          <Color green>{message}</Color>
        </Box>
      )}
      <TextInput value={value} onChange={setValue} onSubmit={handleSubmit} />
    </Box>
  );
}

export function input({ message }: Input) {
  return (onSubmit: onSubmitCallback) => <InputComponent message={message} onSubmit={onSubmit} />;
}
