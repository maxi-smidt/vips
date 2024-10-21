import { Coding } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/coding';
import { RenderProps } from '@/app/components/renderer/RenderProps';
import React from 'react';

export default function CodingRenderer({ value, configEntry }: RenderProps) {
  const coding = value as Coding;

  return (
    <p>
      <strong>{configEntry.display}:</strong>{' '}
      {coding.system && <span>{coding.system} - </span>}
      {coding.code && <span>{coding.code} - </span>}
      {coding.display && <span>{coding.display}</span>}
    </p>
  );
}
