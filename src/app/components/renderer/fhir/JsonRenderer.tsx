import { Address } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/address';
import { RenderProps } from '@/app/components/renderer/RenderProps';
import React from 'react';

export default function JsonRenderer({ value, configEntry }: RenderProps) {

  return (
    <div>
     {configEntry.display} {JSON.stringify(value)}
    </div>
  );
}
