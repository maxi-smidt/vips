import { Identifier } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/identifier';
import { RenderProps } from '@/app/components/renderer/RenderProps';
import React from 'react';

export default function IdentifierRenderer({
  value,
  configEntry,
}: RenderProps) {
  const identifier = value as Identifier;

  return (
    <div className="ml-6 mb-2 mt-2 space-y-1">
      <div className="flex items-center">
        <div style={{ width: '150px', fontWeight: 'bold' }}>
          {configEntry.display}:
        </div>
        <div className="ml-4 flex-1">{identifier.value}</div>
      </div>
    </div>
  );
}
