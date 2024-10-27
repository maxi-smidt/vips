import { Coding } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/coding';
import { RenderProps } from '@/app/components/renderer/RenderProps';
import React from 'react';

export default function CodingRenderer({ value, configEntry }: RenderProps) {
  const coding = value as Coding;

  return (
    <div className="ml-6 mb-2 mt-2 space-y-1">
      <div className="flex">
        <div className="font-semibold" style={{ width: '150px' }}>
          {configEntry.display}:
        </div>
        <div className="ml-4 flex-1">
          {coding.system && <span>{coding.system} - </span>}
          {coding.code && <span>{coding.code} - </span>}
          {coding.display && <span>{coding.display}</span>}
        </div>
      </div>
    </div>
  );
}
