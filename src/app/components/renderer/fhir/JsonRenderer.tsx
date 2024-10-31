import { RenderProps } from '@/app/components/renderer/RenderProps';
import React from 'react';

export default function JsonRenderer({ value, configEntry }: RenderProps) {
  return (
    <div>
      <span>
        {configEntry.display} {JSON.stringify(value)}
      </span>
    </div>
  );
}
