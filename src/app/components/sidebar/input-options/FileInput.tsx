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
    setFile(event.files[0]);
    if (fileUploadRef.current) {
      const input = fileUploadRef.current.getInput();
      if (input) {
        fileUploadRef.current.clear()
        fileUploadRef.current.setUploadedFiles([event.files[0]]);
      }
  };
};

  const loadUploadedFile = () => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target) {
        let fileContent = event.target.result;
        if (typeof fileContent === 'string') {
          if (file.name.endsWith('.xml')) {
            const fhir = new Fhir();
            fileContent = fhir.xmlToJson(fileContent);
          }
          setBundle(JSON.parse(fileContent));
        } else {
          showError('Could not read file');
        }
      }
    };
    reader.readAsText(file);
  };

  const headerTemplate = (options: any) => {
    return (
      <div className="flex align-items-center justify-content-between">
        {options.chooseButton}
        <Button
          label="Load File"
          severity="secondary"
          onClick={loadUploadedFile}
          disabled={!file}
        />
      </div>
    );
  };

  return (
    <>
      <FileUpload
        ref={fileUploadRef}
        mode="advanced"
        accept=".json, .xml"
        onSelect={onUpload}
        headerTemplate={headerTemplate}
        chooseOptions={{
          label: 'Select file',
          className: 'p-button-outlined p-button-secondary',
        }}
        style={{ width: '100%' }}
        auto={false}
        onRemove={() => setFile(undefined)}
      />
    </>
  );
}
