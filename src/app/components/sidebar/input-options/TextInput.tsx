'use client';

import React, { useState } from 'react';
import { convertXML } from 'simple-xml-to-json';
import { useData } from '@/app/components/DataContext';

export default function TextInput() {
  const { setBundle } = useData();
  const [input, setInput] = useState('');

  const handleParse = () => {
    let parsedContent;
    try {
      // parsing XML
      parsedContent = convertXML(input);
      setBundle(parsedContent);
    } catch (_) {
      try {
        // XML parsing failed -> try parsing as JSON
        parsedContent = JSON.parse(input);
        setBundle(parsedContent);
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
