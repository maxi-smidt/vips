import { ContactPoint } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/contactPoint';
import { RenderProps } from '@/app/components/renderer/RenderProps';
import React from 'react';

export default function ContactPointRenderer({
  value,
  configEntry,
}: RenderProps) {
  const contactPoint = value as ContactPoint;

  return (
    <p>
      <h4>{configEntry.display}:</h4>{' '}
      {contactPoint.system && (
        <span>
          <strong>{contactPoint.system}:</strong>{' '}
        </span>
      )}
      {contactPoint.value && <span>{contactPoint.value}</span>}
      {contactPoint.use && <span> ({contactPoint.use})</span>}
    </p>
  );
}
