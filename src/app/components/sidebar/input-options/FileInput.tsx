'use client';

import { FileUpload, FileUploadSelectEvent } from 'primereact/fileupload';
import { convertXML } from 'simple-xml-to-json';
import React from 'react';
import { useData } from '@/app/components/DataContext';

export default function FileInput() {
  const { setBundle } = useData();

  const onUpload = (event: FileUploadSelectEvent) => {
    const file = new File([event.files[0]], event.files[0].name);
    let fileContent;
    const reader = new FileReader();
    reader.onload = function (event) {
      if (event.target) {
        fileContent = event.target.result;
        if (file.name.endsWith('.xml') && typeof fileContent === 'string') {
          fileContent = convertXML(fileContent);
          setBundle(fileContent);
        } else if (
          file.name.endsWith('.json') &&
          typeof fileContent === 'string'
        ) {
          setBundle(JSON.parse(fileContent));
        }
      }
    };

    reader.readAsText(file); // reads the file and triggers onUpload method
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
