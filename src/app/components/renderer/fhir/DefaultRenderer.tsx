import { RenderProps } from '@/app/components/renderer/RenderProps';
import React from 'react';

export default function DefaultRenderer({ value, configEntry }: RenderProps) {
  return (
    <div className="my-2 space-y-1">
      <div className="flex">
        <div className="font-semibold" style={{ width: '175px' }}>
          {configEntry.display}:
        </div>
        <div className="ml-4 flex-1">{value as string}</div>
      </div>
    </div>
  );
}
