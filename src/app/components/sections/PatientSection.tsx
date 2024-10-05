// PatientSection.tsx
import React from 'react';
import { Patient } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/patient';
interface PatientSectionProps {
  patient: Patient;
}

const PatientSection: React.FC<PatientSectionProps> = ({ patient }) => {
  return (
    <div>
      <p>
        <strong>Name:</strong> {patient.name?.[0]?.family}
      </p>
      <p>
        <strong>Birth Date:</strong> {patient.birthDate}
      </p>
      <p>
        <strong>Gender:</strong> {patient.gender}
      </p>
    </div>
  );
};

export default PatientSection;
