import React from 'react';
import { CodeableConcept } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/codeableConcept';
import { RenderProps } from '@/app/components/renderer/RenderProps';
import { getLink, isValidSystemURL } from '@/app/utils/LinkUtils';

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
      {codeableConcept.coding?.map((coding, index) => {
        const link = getLink(coding.system, coding.code);
        const isValidLink = isValidSystemURL(coding.system);

        return (
          <div key={index} className="flex">
            <div className="w-1/4 font-semibold" style={{ width: '150px' }}>
              Code:
            </div>
            <div className="ml-4 flex-1">
              {coding.display &&
                (isValidLink ? (
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {coding.display}
                  </a>
                ) : (
                  <span>
                    {coding.display} ({coding.code})
                  </span>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
