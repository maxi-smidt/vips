'use client';

import {
  FileUpload,
  FileUploadHeaderTemplateOptions,
  FileUploadSelectEvent,
} from 'primereact/fileupload';
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
        fileUploadRef.current.clear();
        fileUploadRef.current.setUploadedFiles([event.files[0]]);
      }
    }
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

  const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
    return (
      <div className="flex flex-col mb-2">
        {options.chooseButton}
        <Button
          label="Load File"
          severity="secondary"
          onClick={loadUploadedFile}
          className="mt-2"
          disabled={!file}
        />
      </div>
    );
  };

  const itemTemplate = (file: object) => {
    const fileObj = file as { name: string; size: number }; // Cast to the structure you're expecting

    return (
      <div className="flex flex-col p-1 border-b border-gray-300">
        <span className="font-bold text-sm">{fileObj.name}</span>
        <span className="text-gray-600 text-xs">
          {(fileObj.size / 1024).toFixed(2)} KB
        </span>
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
        itemTemplate={itemTemplate}
        chooseOptions={{
          label: 'Select file',
          className: 'p-button-outlined p-button-secondary w-full',
        }}
        className="w-full"
        auto={false}
        onRemove={() => setFile(undefined)}
      />
    </>
  );
}
