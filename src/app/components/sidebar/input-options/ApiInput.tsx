'use client';

import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

// access .env api -> or better expose variable in next config
// const API_URL = process.env.FHIR_API;
// TODO: Where do we want to fetch data from the server? This should probably not happen
//  every time the system or identifier changes, which would be on every sign that gets typed in

export default function ApiInput() {
  const [identifier, setIdentifier] = useState<string>('');
  const [system, setSystem] = useState<string>('');

  return (
    <>
      <InputText
        value={system}
        onChange={(e) => setSystem(e.target.value)}
        placeholder="Enter system value ..."
      />

      <InputText
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        placeholder="Enter identifier ..."
      />

      <Button
        label="Load IPS"
        severity="secondary"
        onClick={() => {}}
        disabled={!identifier || !system}
      />
    </>
  );
}
