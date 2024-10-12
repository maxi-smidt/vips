import { HumanName } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/humanName';
import { RenderProps } from '@/app/components/renderer/RenderProps';
import React from 'react';

export default function HumanNameRenderer({ value, configEntry }: RenderProps) {
  const humanName = value as HumanName;
  return (
    <p>
      <strong>{configEntry.display}:</strong> {humanName.prefix?.join(' ')}{' '}
      {humanName.given?.join(' ')} {humanName.family}{' '}
      {humanName.suffix?.join(' ')}
    </p>
  );
}
