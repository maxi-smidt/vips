import { Identifier } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/identifier';
import { RenderProps } from '@/app/components/renderer/RenderProps';
import React from 'react';

export default function IdentifierRenderer({
  value,
  configEntry,
}: RenderProps) {
  const identifier = value as Identifier;

  return (
    <p>
      <strong>{configEntry.display}:</strong> {identifier.value}
    </p>
  );
}
