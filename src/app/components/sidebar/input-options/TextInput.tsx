'use client';

import { useState } from 'react';
import { convertXML } from 'simple-xml-to-json';

interface TextInputProps {
  // eslint-disable-next-line no-unused-vars
  setJsonContent: (_content: any) => void;
}

export default function TextInput({ setJsonContent }: TextInputProps) {
  const [input, setInput] = useState('');

  const handleParse = () => {
    let parsedContent;
    try {
      // Try parsing as XML first
      parsedContent = convertXML(input);
      setJsonContent(parsedContent);
    } catch (error) {
      console.error('Parsing failed for XML:', error);
      try {
        // If XML parsing fails, try parsing as JSON
        parsedContent = JSON.parse(input);
        setJsonContent(parsedContent);
        console.log('Parsed as JSON:', parsedContent);
      } catch (jsonError) {
        console.error('Parsing failed for both XML and JSON:', jsonError);
      }
    }
  };

  return (
    <>
      <textarea
        value={input}
        placeholder="Paste IPS data ..."
        onChange={(e) => setInput(e.target.value)}
        className="h-36 border-2 border-gray-500 rounded-md p-2 w-full resize-none"
      />
      <button
        onClick={handleParse}
        className="mt-4 p-2 bg-blue-500 text-white rounded-md"
      >
        Parse Content
      </button>
    </>
  );
}
