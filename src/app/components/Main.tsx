'use client';

import React, { useEffect } from 'react';
import VipsSideBar from '@/app/components/sidebar/VipsSideBar';
import { useData } from '@/app/hooks/useData';

export default function Main({ children }: { children: React.ReactNode }) {
  const { expanded, setExpanded } = useData();

  useEffect(() => {
    const storedExpanded = localStorage.getItem('expanded');
    if (storedExpanded) {
      setExpanded(storedExpanded === 'true');
    }
  }, []);

  return (
    <div className="flex flex-1">
      <VipsSideBar />

      <main
        className={`flex-1 p-10 transition-all duration-300 ${expanded ? 'ml-[240px]' : 'ml-[64px]'}`}
      >
        {children}
      </main>
    </div>
  );
}
