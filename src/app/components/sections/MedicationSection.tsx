import React from 'react';
import { Medication } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/medication';
import { ResourceType } from '@/app/components/sections/types/ResourceType';
import { extractResources } from '@/app/utils/ResourceExtractor';
import { SectionProps } from '@/app/components/sections/types/SectionProps';

export default function MedicationSection({ bundle }: SectionProps) {
  const medications: Medication[] = extractResources(
    bundle,
    ResourceType.MEDICATION,
  );

  return (
    <>
      {medications.map((medication, i) => (
        <p key={i}>
          <strong>Code {i + 1}:</strong>{' '}
          {medication.code?.coding?.map((c) => c.code).join(', ') ??
            'No code available'}
        </p>
      ))}
    </>
  );
}
