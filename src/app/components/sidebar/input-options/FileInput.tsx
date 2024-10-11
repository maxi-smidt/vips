'use client';

import { FileUpload, FileUploadSelectEvent } from 'primereact/fileupload';
import React, { useRef, useState } from 'react';
import { useData } from '@/app/components/provider/DataProvider';
import { Fhir } from 'fhir';
import { useToast } from '@/app/components/provider/ToastProvider';
import { Button } from 'primereact/button';

export default function FileInput() {
  const { setBundle } = useData();
  const { showError } = useToast();
  const fileUploadRef = useRef<FileUpload>(null);
  const [file, setFile] = useState<File | undefined>();

  const onUpload = (event: FileUploadSelectEvent) => {
    setFile(new File([event.files[0]], event.files[0].name));
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
    setFile(undefined);
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
          className: 'p-button-outlined p-button-secondary',
          style: { width: '100%' },
        }}
        style={{ width: '100%' }}
      />

      <Button
        label="Load File"
        severity="secondary"
        onClick={loadUploadedFile}
        disabled={!file}
      />
    </>
  );
}
