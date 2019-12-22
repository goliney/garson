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
  isActive: boolean;
  item: MultiChoiceOption;
}

export function Item({ isActive, item }: ItemProps) {
  return <Color blue={isActive}>{item.label}</Color>;
}
