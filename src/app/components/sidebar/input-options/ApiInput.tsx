'use client';

import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useBundle } from '@/app/hooks/useBundle';
import { useToast } from '@/app/hooks/useToast';
import { Bundle } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/bundle';

// access .env api -> or better expose variable in next config
// const API_URL = process.env.FHIR_API;

export default function ApiInput() {
  const [identifierSystem, setIdentifierSystem] = useState<string>('');
  const [identifierValue, setIdentifierValue] = useState<string>('');
  const [fhirServer, setFhirServer] = useState<string>('');
  const { setBundle } = useBundle();
  const { showError } = useToast();

  const loadIpsFromApi = async () => {
    try {
      const server = fhirServer.endsWith('/') ? fhirServer : `${fhirServer}/`;
      const response = await fetch(
        `${server}Bundle?IPSbyPatientIdentifier=${encodeURIComponent(identifierSystem)}${encodeURIComponent('|')}${encodeURIComponent(identifierValue)}`,
      );

      if (!response.ok) {
        throw new Error();
      }

      const data: Bundle = await response.json();
      if (data.entry && data.entry.length > 0) {
        setBundle(data.entry[0].resource as Bundle);
      }
    } catch (_) {
      showError('The data could not be fetched');
    }
  };
  return (
    <>
      <InputText
        value={fhirServer}
        onChange={(e) => setFhirServer(e.target.value)}
        placeholder="Enter fhir server endpoint ..."
      />

      <InputText
        value={identifierValue}
        onChange={(e) => setIdentifierValue(e.target.value)}
        placeholder="Enter Identifier Value ..."
      />
      <InputText
        value={identifierSystem}
        onChange={(e) => setIdentifierSystem(e.target.value)}
        placeholder="Enter Identifier System ..."
      />

      <Button
        label="Load IPS"
        severity="secondary"
        onClick={loadIpsFromApi}
        disabled={!identifierValue || !fhirServer || !identifierSystem}
      />
    </>
  );
}
