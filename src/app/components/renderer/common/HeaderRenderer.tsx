import { RenderProps } from '@/app/components/renderer/RenderProps';
import React from 'react';

export default function HeaderRenderer({ value, configEntry }: RenderProps) {
  return (
    <p>
      <h3>{configEntry.display}:</h3>{' '}
    </p>
  );
}
