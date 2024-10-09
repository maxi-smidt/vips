import React from 'react';
import { Patient } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/patient';
import { SectionProps } from '@/app/components/sections/types/SectionProps';
import { ResourceType } from '@/app/components/sections/types/ResourceType';
import { extractResource } from '@/app/utils/ResourceExtractor';

export default function PatientSection({ bundle }: SectionProps) {
  const patient: Patient = extractResource(bundle, ResourceType.PATIENT);

  return (
    <>
      <p>
        <strong>Name:</strong> {patient.name?.[0]?.family}
      </p>
      <p>
        <strong>Birth Date:</strong> {patient.birthDate}
      </p>
      <p>
        <strong>Gender:</strong> {patient.gender}
      </p>
    </>
  );
}
