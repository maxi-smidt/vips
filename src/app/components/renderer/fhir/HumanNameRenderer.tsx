import { HumanName } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/humanName';
import { RenderProps } from '@/app/components/renderer/RenderProps';
import React from 'react';

export default function HumanNameRenderer({ value, configEntry }: RenderProps) {
  const humanName = value as HumanName;

  return (
    <div className="my-2 space-y-2" style={{ width: '400px' }}>
      <div className="flex items-center">
        <div style={{ width: '175px', fontWeight: 'bold' }}>
          {configEntry.display}:
        </div>
        <div className="ml-4 flex-1">
          <span>
            {humanName.prefix?.join(' ')} {humanName.given?.join(' ')}{' '}
            {humanName.family} {humanName.suffix?.join(' ')}
          </span>
        </div>
      </div>
    </div>
  );
}
