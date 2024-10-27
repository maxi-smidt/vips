import { RenderProps } from '@/app/components/renderer/RenderProps';
import React from 'react';

export default function LinkRenderer({ value, configEntry }: RenderProps) {
  const reference = value as string;

  return (
    <div className="ml-6 mb-2 mt-2 space-y-1">
      <div className="flex items-center">
        <div style={{ width: '150px', fontWeight: 'bold' }}>
          <a href={`/#${reference}`}>{configEntry.display}:</a>
        </div>
        <div className="ml-4 flex-1">
          <a href={`/#${reference}`} className="text-blue-600 hover:underline">
            {reference}
          </a>
        </div>
      </div>
    </div>
  );
}
