// MedicationSection.tsx
import React from 'react';
import { Medication } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/medication';

interface MedicationSectionProps {
  medications: Medication[];
}

const MedicationSection: React.FC<MedicationSectionProps> = ({
  medications,
}) => {
  return (
    <div>
      <p>
        <strong>Code 1:</strong>{' '}
        {medications[0]?.code?.coding?.[0]?.code ?? 'No code available'}
      </p>
    </div>
  );
};

export default MedicationSection;
