import { Identifier } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/identifier';
import { RenderProps } from '@/app/components/renderer/RenderProps';
import React from 'react';

export default function IdentifierRenderer({
  value,
  configEntry,
}: RenderProps) {
  const identifier = value as Identifier;

  return (
    <div className="my-2 space-y-2" style={{ width: '400px' }}>
      <div className="flex items-center">
        <div className="font-bold" style={{ width: '175px' }}>
          <strong>{configEntry.display}:</strong>
        </div>
        <div className="ml-4 flex-1">{identifier.value}</div>
      </div>
    </div>
  );
}
