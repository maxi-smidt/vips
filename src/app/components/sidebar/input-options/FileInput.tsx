'use client';

import { FileUpload, FileUploadSelectEvent } from 'primereact/fileupload';
import React, { useRef, useState } from 'react';
import { Fhir } from 'fhir';
import { Button } from 'primereact/button';
import { useBundle } from '@/app/hooks/useBundle';
import { useToast } from '@/app/hooks/useToast';

export default function FileInput() {
  const { setBundle } = useBundle();
  const { showError } = useToast();
  const fileUploadRef = useRef<FileUpload>(null);
  const [file, setFile] = useState<File | undefined>();

  const onUpload = (event: FileUploadSelectEvent) => {
    setFile(new File([event.files[0]], event.files[0].name));
    fileUploadRef.current?.clear();
  };

  const onLoad = (event: ProgressEvent<FileReader>) => {
    if (event.target) {
      let fileContent = event.target.result;
      if (typeof fileContent === 'string') {
        if (file!.name.endsWith('.xml')) {
          const fhir = new Fhir();
          fileContent = fhir.xmlToJson(fileContent);
        }
        setBundle(JSON.parse(fileContent));
      } else {
        showError('Could not read file');
      }
    }
  };

  const loadUploadedFile = () => {
    const reader = new FileReader();
    reader.onload = onLoad;
    reader.readAsText(file!);
    if (fileUploadRef.current) {
      fileUploadRef.current.clear();
    }
  };

  return (
    <>
      <FileUpload
        ref={fileUploadRef}
        mode="basic"
        accept=".json, .xml"
        onSelect={onUpload}
        chooseOptions={{
          label: 'Select file',
          className: 'p-button-outlined p-button-secondary w-full',
        }}
      />

      {file && (
        <Button
          outlined
          severity="secondary"
          label={file.name}
          disabled={true}
        />
      )}

      <Button
        label="Load File"
        severity="secondary"
        onClick={loadUploadedFile}
        disabled={!file}
      />
    </>
  );
}
