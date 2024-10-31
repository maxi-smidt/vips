import { Period } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/period';
import { RenderProps } from '@/app/components/renderer/RenderProps';
import React from 'react';

export default function PeriodRenderer({ value, configEntry }: RenderProps) {
  const period = value as Period;

  return (
    <div>
      <h4>{configEntry.display}:</h4>
      {period.start && (
        <p>
          <strong>Start:</strong> {new Date(period.start).toLocaleString()}
        </p>
      )}
      {period.end && (
        <p>
          <strong>End:</strong> {new Date(period.end).toLocaleString()}
        </p>
      )}
      {!period.start && !period.end && <p>No time range specified</p>}
    </div>
  );
}
