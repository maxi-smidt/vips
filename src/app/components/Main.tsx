'use client';

import React, { useEffect } from 'react';
import VipsSideBar from '@/app/components/sidebar/VipsSideBar';
import { useData } from '@/app/hooks/useData';

export default function Main({ children }: { children: React.ReactNode }) {
  const { setExpanded } = useData();

  useEffect(() => {
    const storedExpanded = localStorage.getItem('expanded');
    if (storedExpanded) {
      setExpanded(storedExpanded === 'true');
    }
  }, []);

  return (
    <div className="flex flex-row" style={{ height: `calc(100vh - 80px)` }}>
      <aside className="flex h-full overflow-y-auto">
        <VipsSideBar />
      </aside>

      <main className="flex-1 h-full overflow-y-auto">{children}</main>
    </div>
  );
}
