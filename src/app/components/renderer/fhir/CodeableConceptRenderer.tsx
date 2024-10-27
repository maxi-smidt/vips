import { CodeableConcept } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/codeableConcept';
import { RenderProps } from '@/app/components/renderer/RenderProps';
import React from 'react';
import { getLink } from '@/app/config/LinkConfig';

export default function CodeableConceptRenderer({
  value,
  configEntry,
}: RenderProps) {
  const codeableConcept = value as CodeableConcept;

  return (
    <div className="ml-6 mb-2 mt-2 space-y-1">
      <div className="font-semibold" style={{ width: '150px' }}>
        {configEntry.display}:
      </div>
      {codeableConcept.coding?.map(({ system, code, display }, index) => (
        <div key={index} className="flex">
          <div className="w-1/4 font-semibold" style={{ width: '150px' }}>
            Code:
          </div>
          <div className="ml-4 flex-1">
            {display && (
              <a
                href={getLink(system, code)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {display}
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
