import { RenderProps } from '@/app/components/renderer/RenderProps';
import React from 'react';
import Link from 'next/link';
import { useData } from '@/app/hooks/useData';

export default function LinkRenderer({ value, configEntry }: RenderProps) {
  const reference = value as string;
  const { setActiveTabs } = useData();

  const handleClick = () => {
    const refElement = document.getElementById(reference);
    if (refElement) {
      const match = refElement.className.match(/tabIndex=(\d+)/);
      const tabIndex = match ? parseInt(match[1], 10) : null;
      if (tabIndex !== null) {
        setActiveTabs((prevState) => {
          return prevState.includes(tabIndex)
            ? prevState
            : [...prevState, tabIndex];
        });
      }
    }
  };


  return (
    <div className="ml-6 mb-2 mt-2 space-y-1">
      <div className="flex items-center">
        <div style={{ width: '150px', fontWeight: 'bold' }}>
          <a href={`/#${reference}`}>{configEntry.display}:</a>
        </div>
        <div className="ml-4 flex-1">
          <Link href={`/#${reference}`} onClick={handleClick}>
          {configEntry.display}
        </Link>
        </div>
      </div>
    </div>
  );
}
