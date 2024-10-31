import { ContactPoint } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/contactPoint';
import { RenderProps } from '@/app/components/renderer/RenderProps';
import React from 'react';

export default function ContactPointRenderer({
  value,
  configEntry,
}: RenderProps) {
  const contactPoint = value as ContactPoint;

  return (
    <div className="my-2 space-y-1">
      <div className="flex">
        <div className="font-semibold" style={{ width: '175px' }}>
          {configEntry.display}:
        </div>
        <div className="ml-4 flex-1">
          {contactPoint.system && (
            <span>
              {contactPoint.system}:{' '}
            </span>
          )}
          {contactPoint.value && <span>{contactPoint.value}</span>}
          {contactPoint.use && <span> ({contactPoint.use})</span>}
        </div>
      </div>
    </div>
  );
}
