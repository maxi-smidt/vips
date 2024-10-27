import { RenderProps } from '@/app/components/renderer/RenderProps';
import React from 'react';
import { Annotation } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/annotation';

export default function AnnotationRenderer({
  value,
  configEntry,
}: RenderProps) {
  const annotation = value as Annotation;

  return (
    <p>
      <strong>{configEntry.display}:</strong> {annotation.text}
      {annotation.authorString && <div>(from {annotation.authorString})</div>}
      {annotation.time && <div>(at {JSON.stringify(annotation.time)})</div>}
    </p>
  );
}
