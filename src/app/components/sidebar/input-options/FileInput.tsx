'use client';

import { FileUpload, FileUploadSelectEvent } from 'primereact/fileupload';

import { convertXML } from 'simple-xml-to-json';

export default function FileInput() {
  const handleFileLoad = (event: ProgressEvent<FileReader>, file: File) => {
    let fileContent = event.target?.result;

    console.log('unparsed fileContent: ', fileContent);

    // Check if it's XML and convert
    if (
      file &&
      (file.type === 'application/xml' || file.name.endsWith('.xml')) &&
      typeof fileContent === 'string'
    ) {
      fileContent = convertXML(fileContent);
      console.log('parsed file content: ', fileContent);
    }
  };

  const onUpload = (event: FileUploadSelectEvent) => {
    const file = event.files[0];

    const reader = new FileReader();
    reader.onload = (loadEvent) => handleFileLoad(loadEvent, file);

    // Read the file as text and trigger onload event
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
