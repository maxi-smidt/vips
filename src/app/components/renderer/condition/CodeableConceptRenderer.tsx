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
          {coding.code && coding.system && (
            <span>
              Code:{' '}
              <a href={`${coding.system}/${coding.code}`} target="_blank">
                {coding.code}
              </a>
            </span>
          )}
          {coding.display && <span> &quot;{coding.display}&quot; </span>}
        </p>
      ))}
    </div>
  );
}
