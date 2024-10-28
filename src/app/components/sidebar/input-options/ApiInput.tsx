'use client';

import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useBundle } from '@/app/hooks/useBundle';

// access .env api -> or better expose variable in next config
// const API_URL = process.env.FHIR_API;
// TODO: Where do we want to fetch data from the server? This should probably not happen
//  every time the system or identifier changes, which would be on every sign that gets typed in

export default function ApiInput() {
  const [identifier, setIdentifier] = useState<string>('');
  const [system, setSystem] = useState<string>('');
  const { setBundle } = useBundle();

  const loadIpsFromApi = async () => {
    try {
      const response = await fetch(
        `https://server.fire.ly/Bundle?composition.patient.identifier=${identifier}`,
        {
          method: 'GET',
        },
      );
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setBundle(data);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('The data could not be fetched or parsed');
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
