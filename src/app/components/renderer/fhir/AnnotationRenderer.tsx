import { RenderProps } from '@/app/components/renderer/RenderProps';
import React from 'react';
import { Annotation } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/annotation';

export default function AnnotationRenderer({
  value,
  configEntry,
}: RenderProps) {
  const annotation = value as Annotation;

  return (
    <div className="my-2 space-y-1">
      <div className="flex">
        <div className="font-semibold" style={{ width: '175px' }}>
          {configEntry.display}:
        </div>
        <div className="ml-4 flex-1">
          <span>{annotation.text}</span>
        </div>
      </div>
      {annotation.authorString && (
        <div className="flex">
          <div className="w-1/4" style={{ width: '175px' }}></div>
          <div className="ml-4 flex-1">
            <span>(from {annotation.authorString})</span>
          </div>
        </div>
      )}
      {annotation.time && (
        <div className="flex">
          <div className="w-1/4" style={{ width: '175px' }}></div>
          <div className="ml-4 flex-1">
            <span>(at {JSON.stringify(annotation.time)})</span>
          </div>
        </div>
      )}
    </div>
  );
}
