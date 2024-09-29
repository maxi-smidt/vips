'use client';

import { useState } from 'react';

export default function ApiInput() {
  const [identifier, setIdentifier] = useState('');
  const [system, setSystem] = useState('');
  // TODO: Where do we want to fetch data from the server? This should probably not happen every time the system or identifier changes, which would be on every sign that gets typed in
  return (
    <>
      <input
        value={system}
        placeholder={'Enter system value ...'}
        onChange={(e) => setSystem(e.target.value)}
        className={
          'h-8 border-2 border-gray-500 rounded-md p-2 my-1 w-full resize-none'
        }
      />
      <input
        value={identifier}
        placeholder={'Enter identifier ...'}
        onChange={(e) => setIdentifier(e.target.value)}
        className={
          'h-8 border-2 border-gray-500 rounded-md p-2 my-1 w-full resize-none'
        }
      />
    </>
  );
}
