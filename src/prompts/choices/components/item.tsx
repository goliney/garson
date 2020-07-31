import React from 'react';
import { Text } from 'ink';

type ChoiceValue = any;

export interface ChoiceOption {
  key?: string;
  label: string;
  value: ChoiceValue;
}

export interface ItemProps {
  isSelected: boolean;
  item: ChoiceOption;
}

export function Item({ isSelected, item }: ItemProps) {
  return <Text color={isSelected ? '#0057ff' : ''}>{item.label}</Text>;
}
