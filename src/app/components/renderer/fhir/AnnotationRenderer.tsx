import { RenderProps } from '@/app/components/renderer/RenderProps';
import React from 'react';
import { Annotation } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/annotation';

export default function AnnotationRenderer({
  value,
  configEntry,
}: RenderProps) {
  const annotation = value as Annotation;

  return (
    <div className="ml-6 mb-2 mt-2 space-y-1">
      <div className="flex">
        <div className="font-semibold" style={{ width: '150px' }}>
          {configEntry.display}:
        </div>
        <div className="ml-4 flex-1">{annotation.text}</div>
      </div>
      {annotation.authorString && (
        <div className="flex">
          <div className="w-1/4" style={{ width: '150px' }}></div>
          <div className="ml-4 flex-1">(from {annotation.authorString})</div>
        </div>
      )}
      {annotation.time && (
        <div className="flex">
          <div className="w-1/4" style={{ width: '150px' }}></div>
          <div className="ml-4 flex-1">
            (at {JSON.stringify(annotation.time)})
          </div>
        </div>
      )}
    </div>
  );
}
