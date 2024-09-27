'use client';

import { FileUpload, FileUploadSelectEvent } from 'primereact/fileupload';

import { convertXML } from 'simple-xml-to-json';

export default function FileInput() {
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
          console.log('converted file content: ', convertXML(fileContent));
          fileContent = convertXML(fileContent);
        }
      }
    };

    // Read the file as text
    reader.readAsText(file);
  };

  return (
    <FileUpload
      style={{ width: '100%' }}
      mode="basic"
      url="/api/upload"
      accept=".json, .xml"
      onSelect={onUpload}
    />
  );
}
