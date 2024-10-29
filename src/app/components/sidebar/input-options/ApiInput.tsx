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
  const [identifier, setIdentifier] = useState<string>('');
  const [system, setSystem] = useState<string>('');
  const { setBundle } = useBundle();
  const { showError } = useToast();

  const loadIpsFromApi = async () => {
    try {
      const server = system.endsWith('/') ? system : `${system}/`;
      const response = await fetch(
        `${server}Bundle?composition.patient.identifier=${identifier}`,
      );

      if (!response.ok) {
        throw new Error();
      }

      const data: Bundle = await response.json();
      console.log(data);
      if (data.entry && data.entry.length > 0) {
        console.log(data.entry[0].resource);
        setBundle(data.entry[0].resource as Bundle);
      }
    } catch (_) {
      showError('The data could not be fetched');
    }
  };
  return (
    <>
      <InputText
        value={system}
        onChange={(e) => setSystem(e.target.value)}
        placeholder="Enter fhir server endpoint ..."
      />

      <InputText
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        placeholder="Enter SVNR ..."
      />

      <Button
        label="Load IPS"
        severity="secondary"
        onClick={loadIpsFromApi}
        disabled={!identifier || !system}
      />
    </>
  );
}
