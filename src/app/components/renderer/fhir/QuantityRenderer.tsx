import { Quantity } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/quantity';
import { RenderProps } from '@/app/components/renderer/RenderProps';
import React from 'react';

export default function QuantityRenderer({ value, configEntry }: RenderProps) {
  const quantity = value as Quantity;

  return (
    <div>
      <h4>{configEntry.display}:</h4>
      <div className="ml-4 mb-2 space-y-2" style={{ width: '500px' }}>
        {quantity.value && (
          <div className="flex items-center">
            <div className="font-semibold" style={{ width: '175px' }}>
              Value:
            </div>
            <div className="flex-1 ml-4">{quantity.value}</div>
          </div>
        )}
        {quantity.comparator && (
          <div className="flex items-center">
            <div className="font-semibold" style={{ width: '175px' }}>
              Comparator:
            </div>
            <div className="flex-1 ml-4">{quantity.comparator}</div>
          </div>
        )}
        {quantity.unit && (
          <div className="flex items-center">
            <div className="font-semibold" style={{ width: '175px' }}>
              Unit:
            </div>
            <div className="flex-1 ml-4">{quantity.unit}</div>
          </div>
        )}
        {quantity.system && (
          <div className="flex items-center">
            <div className="font-semibold" style={{ width: '175px' }}>
              System:
            </div>
            <div className="flex-1 ml-4">{quantity.system}</div>
          </div>
        )}
        {quantity.code && (
          <div className="flex items-center">
            <div className="font-semibold" style={{ width: '175px' }}>
              Code:
            </div>
            <div className="flex-1 ml-4">{quantity.code}</div>
          </div>
        )}
      </div>
    </div>
  );
}
