'use client';

import { FileUpload, FileUploadSelectEvent } from 'primereact/fileupload';
import { convertXML } from 'simple-xml-to-json';
import React, { Dispatch } from 'react';
import { Bundle } from '@smile-cdr/fhirts/src/FHIR-R4/classes/bundle';

interface FileInputProps {
  setContent: Dispatch<React.SetStateAction<Bundle>>;
}

export default function FileInput({ setContent }: FileInputProps) {
  const onUpload = (event: FileUploadSelectEvent) => {
    const file = new File([event.files[0]], event.files[0].name);
    let fileContent;
    // Create a FileReader instance
    const reader = new FileReader();
    reader.onload = function (event) {
      if (event.target) {
        fileContent = event.target.result;
        console.log('fileContent: ', fileContent);
        if (
          (file.type === 'application/xml' || file.name.endsWith('.xml')) &&
          typeof fileContent === 'string'
        ) {
          fileContent = convertXML(fileContent);
          console.log('fileContent json: ', fileContent);
          setContent(fileContent);
        }
      }
    };
    // Read the file as text and trigger onload method
    reader.readAsText(file);
  };
  return (
    <FileUpload
      style={{ width: '100%' }}
      mode="basic"
      accept=".json, .xml"
      onSelect={onUpload}
    />
  );
}
