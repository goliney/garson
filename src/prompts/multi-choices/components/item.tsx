import React from 'react';
import { Text } from 'ink';

type ChoiceValue = any;

export interface MultiChoiceOption {
  key?: string;
  label: string;
  value: ChoiceValue;
  isSelected?: boolean;
}

export interface ItemProps {
  isHighlighted: boolean;
  item: MultiChoiceOption;
}

export function Item({ isHighlighted, item }: ItemProps) {
  return <Text color={isHighlighted ? '#0057ff' : ''}>{item.label}</Text>;
}
