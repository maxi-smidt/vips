import { CodeableConcept } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/codeableConcept';
import { RenderProps } from '@/app/components/renderer/RenderProps';
import React from 'react';

export default function CodeableConceptRenderer({
  value,
  configEntry,
}: RenderProps) {
  const codeableConcept = value as CodeableConcept;

  return (
    <div>
      <strong>{configEntry.display}:</strong>
      {codeableConcept.coding?.map((coding, index) => (
        <p key={index}>
          {coding.code && <span>Code: {coding.code} </span>}
          {coding.display && <span> &quot;{coding.display}&quot; </span>}
          {coding.system && <span>{coding.system} </span>}
        </p>
      ))}
    </div>
  );
}
