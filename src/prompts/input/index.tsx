import React, { useState, useCallback } from 'react';
import { Box } from 'ink';
import TextInput from 'ink-text-input';
import { OnSubmitCallback } from '../../types';
import { Question } from '../../_helpers';

interface Input {
  message?: string;
  placeholder?: string;
  defaultValue?: string;
}

interface InputProps extends Input {
  onChange?: (value: string) => void;
  onSubmit?: OnSubmitCallback;
}

export function InputComponent({
  message,
  placeholder = '',
  defaultValue = '',
  onChange,
  onSubmit,
}: InputProps) {
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = useCallback(
    submittedValue => {
      if (onSubmit) {
        onSubmit(submittedValue);
      }
    },
    [onSubmit]
  );

  const handleChange = useCallback(
    newValue => {
      setValue(newValue);
      if (onChange) {
        onChange(newValue);
      }
    },
    [onChange]
  );

  return (
    <Box>
      <Question message={message} />
      <TextInput
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
        placeholder={placeholder}
      />
    </Box>
  );
}

export function input({ message, placeholder, defaultValue }: Input = {}) {
  return (onSubmit: OnSubmitCallback) => (
    <InputComponent
      message={message}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onSubmit={onSubmit}
    />
  );
}
