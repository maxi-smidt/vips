import { Period } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/period';
import { RenderProps } from '@/app/components/renderer/RenderProps';
import React from 'react';

export default function PeriodRenderer({ value, configEntry }: RenderProps) {
  const period = value as Period;

  return (
    <div className="my-2 space-y-2" style={{ width: '400px' }}>
      <div className="flex items-center">
        <div className="font-bold" style={{ width: '175px' }}>
          {configEntry.display}:
        </div>
        <div className="ml-4 flex-1">
          <span>
            {period.start && (
              <p>Start: {new Date(period.start).toLocaleString()}</p>
            )}
            {period.end && <p>End: {new Date(period.end).toLocaleString()}</p>}
            {!period.start && !period.end && <p>No time range specified</p>}
          </span>
        </div>
      </div>
    </div>
  );
}
