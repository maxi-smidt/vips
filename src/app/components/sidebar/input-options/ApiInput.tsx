'use client';

import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useBundle } from '@/app/hooks/useBundle';
import { useToast } from '@/app/hooks/useToast';

// access .env api -> or better expose variable in next config
// const API_URL = process.env.FHIR_API;
// TODO: Where do we want to fetch data from the server? This should probably not happen
//  every time the system or identifier changes, which would be on every sign that gets typed in

export default function ApiInput() {
  const [identifier, setIdentifier] = useState<string>('');
  const [system, setSystem] = useState<string>('');
  const { setBundle } = useBundle();
  const { showError } = useToast();

  const loadIpsFromApi = async () => {
    try {
      const response = await fetch(
        `https://server.fire.ly/Bundle?composition.patient.identifier=${identifier}`,
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      console.log(data);
      console.log(typeof data === 'string');
      setBundle(data);
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
