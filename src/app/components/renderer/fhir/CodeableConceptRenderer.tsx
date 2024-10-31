import React from 'react';
import { CodeableConcept } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/codeableConcept';
import { RenderProps } from '@/app/components/renderer/RenderProps';
import { getLink } from '@/app/utils/LinkUtils';
import Image from 'next/image';

export default function CodeableConceptRenderer({
  value,
  configEntry,
}: RenderProps) {
  const codeableConcept = value as CodeableConcept;

  return (
    <div className="my-2">
      <div className="flex">
        <div className="font-semibold" style={{ width: '175px' }}>
          {configEntry.display}:
        </div>
        <div className="ml-4 flex-1">
          {codeableConcept.coding?.map((coding, index) => {
            const link = getLink(
              coding.system as string,
              coding.code as string,
            );

            const displayText =
              coding.display || coding.code || codeableConcept.text;

            return (
              displayText && (
                <div key={index} className="mb-2">
                  {' '}
                  <span>{displayText} </span>
                  {link ? (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`See details for code "${coding.code}"`}
                      className="ml-1"
                    >
                      <Image
                        src={`${process.env.IMAGE_PATH}/icons/external_link.svg`}
                        width={15}
                        height={15}
                        alt={`Details for "${displayText}"`}
                      />
                    </a>
                  ) : (
                    <div className="ml-4 mt-1">
                      <span>→ System: </span>
                      <span>
                        <a href={coding.system}>{coding.system}</a>
                      </span>
                      <br />
                      <span>→ Code: {coding.code}</span>
                    </div>
                  )}
                </div>
              )
            );
          })}

          {!codeableConcept.coding?.length && codeableConcept.text && (
            <div className="flex items-center mb-1">
              <span>{codeableConcept.text}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
