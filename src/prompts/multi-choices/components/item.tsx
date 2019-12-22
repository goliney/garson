import React from 'react';
import { Color } from 'ink';

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
  return <Color blue={isHighlighted}>{item.label}</Color>;
}
