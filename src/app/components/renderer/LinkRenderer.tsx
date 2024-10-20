import { RenderProps } from '@/app/components/renderer/RenderProps';
import React from 'react';

export default function LinkRenderer({ value, configEntry }: RenderProps) {
  const reference = value as string;
  return (
    <p>
      <strong>
        <a href={`/#${reference}`}>{configEntry.display}</a>
      </strong>
    </p>
  );
}
