'use client';

import React, { useState } from 'react';
import { useData } from '@/app/hooks/useData';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { useToast } from '@/app/hooks/useToast';
import { Fhir } from 'fhir';
import { SelectButton } from 'primereact/selectbutton';

export default function TextInput() {
  const { setBundle } = useData();
  const { showError } = useToast();
  const options = ['JSON', 'XML'];
  const [option, setOption] = useState(options[0]);
  const [input, setInput] = useState<string>();

  const loadText = () => {
    try {
      let textContent = input!;
      if (option === 'XML') {
        const fhir = new Fhir();
        textContent = fhir.xmlToJson(input!);
      }
      setBundle(JSON.parse(textContent));
      setInput('');
    } catch (_) {
      showError('The text could not be parsed');
    }
  };

  return (
    <>
      <SelectButton
        value={option}
        onChange={(e) => setOption(e.value)}
        options={options}
        pt={{
          root: { style: { width: '100%' } },
          button: { style: { width: '50%' } },
        }}
      />

      <InputTextarea
        value={input}
        onChange={(event) => setInput(event.target.value)}
        style={{ width: 'auto', resize: 'none' }}
      />

      <Button
        label="Load Text"
        severity="secondary"
        onClick={loadText}
        disabled={!input}
      />
    </>
  );
}
