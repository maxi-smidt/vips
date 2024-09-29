'use client';

import { useState } from 'react';

export default function TextInput() {
  const [input, setInput] = useState('');

  return (
    <textarea
      value={input}
      placeholder={'Paste IPS data ...'}
      onChange={(e) => setInput(e.target.value)}
      className={
        'h-36 border-2 border-gray-500 rounded-md p-2 w-full resize-none'
      }
    />
  );
}
