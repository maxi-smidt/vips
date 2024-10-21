import { Address } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/address';
import { RenderProps } from '@/app/components/renderer/RenderProps';
import React from 'react';

export default function AddressRenderer({ value, configEntry }: RenderProps) {
  const address = value as Address;

  return (
    <div>
      <h4>{configEntry.display}:</h4>
      {address.line && (
        <p>
          <strong>Address Line:</strong> {address.line.join(', ')}
        </p>
      )}
      {address.city && (
        <p>
          <strong>City:</strong> {address.city}
        </p>
      )}
      {address.state && (
        <p>
          <strong>State:</strong> {address.state}
        </p>
      )}
      {address.postalCode && (
        <p>
          <strong>Postal Code:</strong> {address.postalCode}
        </p>
      )}
      {address.country && (
        <p>
          <strong>Country:</strong> {address.country}
        </p>
      )}
    </div>
  );
}
