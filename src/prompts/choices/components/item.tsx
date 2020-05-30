import React from 'react';
import { Color } from 'ink';

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
  return <Color hex={isSelected ? '#0057ff' : ''}>{item.label}</Color>;
}
