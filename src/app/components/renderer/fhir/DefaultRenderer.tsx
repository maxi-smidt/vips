import { RenderProps } from '@/app/components/renderer/RenderProps';
import React from 'react';

export default function DefaultRenderer({ value, configEntry }: RenderProps) {
  return (
    <p>
      <strong>{configEntry.display}:</strong> {value as string}
    </p>
  );
}
