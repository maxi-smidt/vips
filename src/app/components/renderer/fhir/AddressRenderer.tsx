import { Address } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/address';
import { RenderProps } from '@/app/components/renderer/RenderProps';
import React from 'react';

export default function AddressRenderer({ value, configEntry }: RenderProps) {
  const address = value as Address;

  return (
    <div>
      <h4>{configEntry.display}:</h4>
      <div className="ml-4 mb-2 space-y-2" style={{ width: '400px' }}>
        {address.line && (
          <div className="flex items-center">
            <div className="font-semibold" style={{ width: '175px' }}>
              Address Line:
            </div>
            <div className="flex-1 ml-4">{address.line.join(', ')}</div>
          </div>
        )}
        {address.city && (
          <div className="flex items-center">
            <div className="font-semibold" style={{ width: '175px' }}>
              City:
            </div>
            <div className="flex-1 ml-4">{address.city}</div>
          </div>
        )}
        {address.state && (
          <div className="flex items-center">
            <div className="font-semibold" style={{ width: '175px' }}>
              State:
            </div>
            <div className="flex-1 ml-4">{address.state}</div>
          </div>
        )}
        {address.postalCode && (
          <div className="flex items-center">
            <div className="font-semibold" style={{ width: '175px' }}>
              Postal Code:
            </div>
            <div className="flex-1 ml-4">{address.postalCode}</div>
          </div>
        )}
        {address.country && (
          <div className="flex items-center">
            <div className="font-semibold" style={{ width: '175px' }}>
              Country:
            </div>
            <div className="flex-1 ml-4">{address.country}</div>
          </div>
        )}
      </div>
    </div>
  );
}
