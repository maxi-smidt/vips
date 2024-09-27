'use client';

import React, { useEffect, useState } from 'react';
import VipsSideBar from '@/app/components/sidebar/VipsSideBar';

export default function Main({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    const storedExpanded = localStorage.getItem('expanded');
    if (storedExpanded !== null) {
      setExpanded(storedExpanded === 'true');
    }
  }, []);

  return (
    <div className="flex flex-1">
      <VipsSideBar expanded={expanded} setExpanded={setExpanded} />

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
