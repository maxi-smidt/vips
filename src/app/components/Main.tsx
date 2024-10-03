'use client';

import React, { useEffect, useState } from 'react';
import VipsSideBar from '@/app/components/sidebar/VipsSideBar';
import { Bundle } from '@smile-cdr/fhirts/src/FHIR-R4/classes/bundle';

export default function Main({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [content, setContent] = useState<Bundle>();
  useEffect(() => {
    const storedExpanded = localStorage.getItem('expanded');
    if (storedExpanded) {
      setExpanded(storedExpanded === 'true');
    }
  }, []);

  return (
    <div className="flex flex-1">
      <VipsSideBar
        expanded={expanded}
        setExpanded={setExpanded}
        setContent={setContent}
      />

      <main
        className={`flex-1 p-4 transition-all duration-300 ${
          expanded ? 'ml-64' : 'ml-16'
        }`}
      >
        {children}
      </main>
    </div>
  );
}
