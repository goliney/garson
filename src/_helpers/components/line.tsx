import React from 'react';
import { Color } from 'ink';

interface LineProps {
  message?: string;
  charFiller?: string;
  color?: string;
}

export function Line({ message = '', charFiller = '=', color = 'green' }: LineProps) {
  const lineWidth = process.stdout.columns || 0;
  const fillerWidth = message ? lineWidth - message.length : lineWidth;
  return (
    <Color keyword={color}>
      {message}
      {[...Array(fillerWidth)].join(charFiller)}
    </Color>
  );
}
