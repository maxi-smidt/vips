import { Quantity } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/quantity';
import { RenderProps } from '@/app/components/renderer/RenderProps';
import React from 'react';

export default function QuantityRenderer({ value, configEntry }: RenderProps) {
  const quantity = value as Quantity;

  return (
    <div>
      <h4>{configEntry.display}:</h4>
      {quantity.value !== undefined && (
        <p>
          <strong>Value:</strong> {quantity.value}
        </p>
      )}
      {quantity.comparator && (
        <p>
          <strong>Comparator:</strong> {quantity.comparator}
        </p>
      )}
      {quantity.unit && (
        <p>
          <strong>Unit:</strong> {quantity.unit}
        </p>
      )}
      {quantity.system && (
        <p>
          <strong>System:</strong> {quantity.system}
        </p>
      )}
      {quantity.code && (
        <p>
          <strong>Code:</strong> {quantity.code}
        </p>
      )}
      {quantity.code && !quantity.system && (
        <p className="text-red-500">
          Warning: Unit code is present, but system is missing.
        </p>
      )}
    </div>
  );
}
