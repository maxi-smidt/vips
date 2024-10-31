import { Identifier } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/identifier';
import { RenderProps } from '@/app/components/renderer/RenderProps';
import React from 'react';

export default function IdentifierRenderer({
  value,
  configEntry,
}: RenderProps) {
  const identifier = value as Identifier;

  return (
    <div>
      <h4>{configEntry.display}:</h4>
      <div className="ml-4 mb-2 space-y-2" style={{ width: '600px' }}>
        {identifier.value && (
          <div className="flex items-center">
            <div className="font-semibold" style={{ width: '175px' }}>
              Value:
            </div>
            <div className="flex-1 ml-4">
              <span>{identifier.value}</span>
            </div>
          </div>
        )}
        {identifier.system && (
          <div className="flex items-center">
            <div className="font-semibold" style={{ width: '175px' }}>
              System:
            </div>
            <div className="flex-1 ml-4">
              <span>{identifier.system}</span>
            </div>
          </div>
        )}
        {identifier.type &&
          identifier.type.coding &&
          identifier.type.coding.length > 0 && (
            <div className="space-y-2">
              <div className="font-semibold" style={{ width: '175px' }}>
                Type:
              </div>
              <div className="ml-4">
                {identifier.type.coding[0].system && (
                  <div className="flex items-center">
                    <div className="font-semibold" style={{ width: '175px' }}>
                      System:
                    </div>
                    <div>
                      <span>{identifier.type.coding[0].system}</span>
                    </div>
                  </div>
                )}
                {identifier.type.coding[0].code && (
                  <div className="flex items-center">
                    <div className="font-semibold" style={{ width: '175px' }}>
                      Code:
                    </div>
                    <div>
                      <span>{identifier.type.coding[0].code}</span>
                    </div>
                  </div>
                )}
                {identifier.type.coding[0].display && (
                  <div className="flex items-center">
                    <div className="font-semibold" style={{ width: '175px' }}>
                      Display:
                    </div>
                    <div>
                      <span>{identifier.type.coding[0].display}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}{' '}
      </div>
    </div>
  );
}
